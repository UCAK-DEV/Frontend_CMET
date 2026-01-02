📘 Documentation Technique & API (Spécifications Backend)
Projet : Plateforme Numérique Club MET - UCAK

Version Frontend : 1.0 (React/Vite)

Client : Club Métiers & Technologies (Université Cheikh Ahmadoul Khadim)

1. Architecture & Stack Suggérée
Le Frontend est une SPA (Single Page Application). Le Backend doit servir une API RESTful qui retourne des données au format JSON.

Base URL : /api/v1

Auth : JWT (JSON Web Tokens) via Authorization: Bearer <token>

Base de données suggérée : PostgreSQL (Relationnel) ou MongoDB (NoSQL). Préférence pour SQL vu la structure académique.

Stockage Fichiers : AWS S3, Cloudinary ou stockage local (pour les photos de profil, PDF cours).

2. Base de Données (Schéma Logique)
Voici les entités (tables) nécessaires pour faire fonctionner le frontend actuel.

👤 Users (Étudiants)
id (UUID/Int)

matricule (String, Unique) - Clé de vérification UFR

email (String, Unique)

password_hash (String)

full_name (String)

role (Enum: 'STUDENT', 'ADMIN', 'ALUMNI')

filiere (Enum: 'Informatique', 'HEC', etc.)

promo (String ex: "Licence 3")

xp_points (Int, default 0)

badges (JSON/Array)

is_ufr_verified (Boolean) - Crucial pour le vote

🎓 Courses (Cours Vidéo)
id

title

description

instructor_name

level (L1, L2...)

filiere_tag

thumbnail_url

modules (JSON : structure des chapitres et liens vidéos)

📂 Documents (Bibliothèque)
id

title

type (PDF, EPUB)

file_url

category (Filière)

download_count (Int)

🗳️ Elections (Votes)
id

year (2026)

status ('OPEN', 'CLOSED')

candidates (Relation OneToMany vers table Candidates)

Table Votes (Pour éviter la fraude) :

election_id

user_id (UniqueConstraint : Un user ne vote qu'une fois par élection)

candidate_id

timestamp

💼 Jobs (Offres)
id

title, company, location, type (Stage/CDD), description, link

3. Endpoints API (Routes)
Le frontend va appeler ces routes. Le backend doit respecter ces formats de réponse.

🔐 Authentification & Profil
POST /auth/login
Body : { "email": "...", "password": "..." }

Réponse (200) :

JSON

{
  "token": "jwt_token_xyz",
  "user": {
    "id": 1,
    "name": "Moussa Diop",
    "avatar": "url...",
    "role": "STUDENT"
  }
}
GET /user/profile (Protected)
Réponse : Données complètes pour le Dashboard (XP, Badges, Matricule, Status UFR).

📚 Module Savoir (Knowledge)
GET /courses
Query Params : ?filiere=Info&level=L3

Réponse : Liste des cours.

JSON

[
  {
    "id": 1,
    "title": "React Avancé",
    "instructor": "Club Tech",
    "progress": 35, // Calculé selon l'user connecté
    "image": "url..."
  }
]
GET /courses/:id
Réponse : Détail complet avec les modules et liens vidéos.

POST /courses/:id/progress
Permet au frontend de dire "J'ai fini la leçon 2".

Body : { "lessonId": 12, "completed": true }

GET /documents
Retourne la liste des PDF/EPUB de la bibliothèque.

🗳️ Module Élections (Sécurité Critique)
GET /elections/current
Renvoie les infos de l'élection en cours et la liste des candidats.

Renvoie aussi un booléen user_has_voted: true/false pour l'utilisateur connecté.

POST /elections/vote (Protected)
Règle Backend : Vérifier si user.is_ufr_verified === true. Sinon rejeter (403).

Règle Backend : Vérifier si l'user a déjà voté cette année. Sinon rejeter (400).

Body : { "candidate_id": 3 }

Action : Incrémenter le compteur du candidat et marquer l'user comme ayant voté.

🤝 Module Réseau & Showroom
GET /network/alumni
Liste des anciens étudiants.

Filtres : ?search=Orange

GET /network/jobs
Liste des offres de stage.

GET /showroom/projects
Liste des projets étudiants pour la vitrine.

🏆 Module Challenges (Quizz)
GET /challenges
Liste des quizz disponibles.

POST /challenges/:id/submit
Envoi des réponses ou du score final.

Action Backend : Mettre à jour les xp_points de l'étudiant s'il réussit.

4. Règles Métier Spécifiques
Vérification UFR :

L'inscription (POST /auth/register) doit idéalement valider le matricule étudiant contre une liste blanche fournie par l'administration, OU mettre le compte en "En attente de validation" si automatique.

Seuls les comptes vérifiés ont accès à la page /elections et au vote.

Gamification (XP) :

Finir un cours = +100 XP.

Réussir un quizz = +50 XP.

Le backend doit recalculer le rank (classement) des étudiants chaque nuit ou à chaque action.

Upload de Fichiers :

Pour le Career Center, l'étudiant peut vouloir uploader son propre CV PDF. Prévoir une route POST /user/upload-cv.

