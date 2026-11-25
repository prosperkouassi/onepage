import { NextRequest } from "next/server";
import { handleForm } from "@/lib/forms";
export const runtime = "nodejs";
export async function POST(request: NextRequest) { return handleForm(request, "reservation"); }
