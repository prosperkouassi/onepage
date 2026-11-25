import { NextRequest, NextResponse } from "next/server";

type Kind = "reservation" | "contact";
type FormValues = Record<string, unknown>;
const attempts = new Map<string, { count: number; reset: number }>();
const MAX_BODY_BYTES = 12_000;

function response(error: string, status: number) {
  return NextResponse.json({ ok: false, error }, { status, headers: { "Cache-Control": "no-store" } });
}
function value(data: FormValues, key: string, max: number, required = true): string | null {
  const raw = data[key];
  if (raw === undefined || raw === null || raw === "") return required ? null : "";
  if (typeof raw !== "string") return null;
  const text = raw.trim();
  if ((required && !text) || text.length > max || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(text)) return null;
  return text;
}
function validEmail(email: string) { return /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,24}$/.test(email); }
function validPhone(phone: string) { return /^\+?[0-9][0-9 .()\-]{6,23}$/.test(phone); }
function isFutureDate(date: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  const parsed = new Date(`${date}T12:00:00Z`);
  if (!Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== date) return false;
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Abidjan", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  return date >= today && date <= new Date(Date.now() + 365 * 86400_000).toISOString().slice(0, 10);
}
function isRateLimited(ip: string) {
  const now = Date.now();
  if (attempts.size > 3000) for (const [key, entry] of attempts) if (entry.reset <= now) attempts.delete(key);
  const item = attempts.get(ip);
  if (!item || item.reset <= now) { attempts.set(ip, { count: 1, reset: now + 60_000 }); return false; }
  item.count++;
  return item.count > 5;
}
async function sendEmail(to: string, subject: string, text: string, replyTo: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM_EMAIL;
  if (!apiKey || !from || !to) return false;
  try {
    const result = await fetch("https://api.resend.com/emails", {
      method: "POST", signal: AbortSignal.timeout(8000),
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], subject, text, reply_to: replyTo }),
      cache: "no-store",
    });
    return result.ok;
  } catch { return false; }
}
export async function handleForm(request: NextRequest, kind: Kind) {
  if (request.headers.get("content-type")?.split(";")[0] !== "application/json") return response("Format non accepté.", 415);
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      if (new URL(origin).host !== request.nextUrl.host) return response("Origine non autorisée.", 403);
    } catch { return response("Origine non autorisée.", 403); }
  }
  if (Number(request.headers.get("content-length")) > MAX_BODY_BYTES) return response("Message trop long.", 413);
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(`${kind}:${ip}`)) return response("Trop de demandes. Réessayez dans une minute.", 429);
  let data: FormValues;
  try {
    const body = await request.text();
    if (body.length > MAX_BODY_BYTES) return response("Message trop long.", 413);
    const parsed: unknown = JSON.parse(body);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return response("Données invalides.", 400);
    data = parsed as FormValues;
  } catch { return response("Données invalides.", 400); }
  if (data.website) return NextResponse.json({ ok: true, message: "Votre demande a été prise en compte." });
  const email = value(data, "email", 254);
  const message = value(data, "message", 2000, kind === "contact");
  if (!email || !validEmail(email) || message === null) return response("Vérifiez votre adresse e-mail et votre message.", 400);
  let subject: string, text: string, recipient: string | undefined;
  if (kind === "reservation") {
    const firstName = value(data, "firstName", 80), lastName = value(data, "lastName", 80);
    const phone = value(data, "phone", 25), date = value(data, "date", 10), time = value(data, "time", 5);
    const guests = typeof data.guests === "number" ? data.guests : Number(data.guests);
    if (!firstName || !lastName || !phone || !validPhone(phone) || !date || !isFutureDate(date) || !time || !/^([01]\d|2[0-3]):[0-5]\d$/.test(time) || !Number.isInteger(guests) || guests < 1 || guests > 30) return response("Vérifiez les informations de réservation.", 400);
    subject = `Demande de réservation Bardebabi — ${date}`;
    text = [`Nouvelle demande de réservation (à confirmer par l'établissement)`, `Prénom : ${firstName}`, `Nom : ${lastName}`, `Téléphone : ${phone}`, `E-mail : ${email}`, `Date : ${date}`, `Heure : ${time}`, `Personnes : ${guests}`, `Message : ${message || "Aucun"}`].join("\n");
    recipient = process.env.RESERVATION_TO_EMAIL;
  } else {
    const name = value(data, "name", 160), phone = value(data, "phone", 25, false);
    const topic = value(data, "subject", 120);
    if (!name || !topic || phone === null || (phone && !validPhone(phone))) return response("Vérifiez les informations de contact.", 400);
    subject = `Contact Bardebabi — ${topic.replace(/[\r\n]/g, " ")}`;
    text = [`Nouveau message`, `Nom : ${name}`, `Téléphone : ${phone || "Non renseigné"}`, `E-mail : ${email}`, `Sujet : ${topic}`, `Message : ${message}`].join("\n");
    recipient = process.env.CONTACT_TO_EMAIL;
  }
  if (!recipient || !process.env.RESEND_API_KEY || !process.env.MAIL_FROM_EMAIL) return response("Ce formulaire n'est pas encore disponible. Réessayez plus tard.", 503);
  if (!await sendEmail(recipient, subject, text, email)) return response("Impossible d'envoyer la demande pour le moment. Réessayez plus tard.", 503);
  return NextResponse.json({ ok: true, message: kind === "reservation" ? "Demande transmise. Votre table sera confirmée par l'établissement." : "Message transmis. Nous vous répondrons dès que possible." }, { headers: { "Cache-Control": "no-store" } });
}
