# Bardebabi — webapp one-page

Next.js App Router, TypeScript. Refonte de démonstration d'un bar lounge : navigation par sections, filtres de menu, événements, formulaires de réservation et de contact.

## Développement

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run build
```

## Mise en service des formulaires

Les deux formulaires ne déclarent un envoi réussi que si le service d'e-mail accepte le message. Sans configuration, l'API renvoie 503 et l'interface affiche l'erreur. Définir ces variables côté serveur sur Vercel, jamais avec le préfixe `NEXT_PUBLIC_` :

- `RESEND_API_KEY` : clé API Resend.
- `MAIL_FROM_EMAIL` : expéditeur autorisé sur un domaine validé.
- `RESERVATION_TO_EMAIL` : réception des demandes de table.
- `CONTACT_TO_EMAIL` : réception des contacts.

Les demandes de table nécessitent une confirmation humaine : aucune disponibilité ni capacité n'est vérifiée automatiquement. La limitation de débit mémoire sert seulement de première protection ; pour la production, compléter par une protection partagée (WAF/rate limit Vercel ou stockage durable) et tester l'envoi réel.

## Données et administration

La carte et les événements sont actuellement des contenus indicatifs intégrés au code. Il n'existe pas encore d'interface d'administration, de base de données, de contrôle des places ou des horaires, ni de publication automatique d'événements. Pour les mettre en place, choisir un stockage persistant, un fournisseur d'authentification et les rôles du personnel ; prévoir un journal des modifications et des sauvegardes. Aucun identifiant d'administration ne doit être codé dans le dépôt.

## Avant lancement commercial

Fournir logo, photos autorisées, produits/prix, événements datés, adresse, horaires, téléphone, courriel, calendrier de réservation, capacité, domaine et textes légaux. Configurer l'envoi e-mail et la protection anti-spam, tester en conditions réelles, puis activer les métadonnées publiques, les données structurées vérifiées, le sitemap et l'indexation. Les visuels actuels sont des illustrations distantes et le site interdit l'indexation pendant la phase de démo. Aucun outil d'analyse ou carte tierce n'est chargé sans configuration des données et consentement approprié.
