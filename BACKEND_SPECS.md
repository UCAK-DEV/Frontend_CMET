# 📘 Spécifications Techniques Backend (API)
**Projet :** Club MET - UCAK (Plateforme Numérique)
**Version Frontend :** 2.0 (React/Vite)

Ce document décrit l'architecture, la base de données et les endpoints API nécessaires pour faire fonctionner le frontend.

---

## 1. Stack Technique Recommandée

* **Langage :** Node.js (Express) ou Python (Django/FastAPI).
* **Base de Données :** PostgreSQL (Relationnel) est fortement recommandé pour gérer les relations complexes (Étudiants <-> Cours <-> Votes).
* **Authentification :** JWT (JSON Web Tokens). Le token doit être renvoyé au login et stocké par le frontend.
* **Stockage Fichiers :** AWS S3, Cloudinary ou stockage local (pour les photos de profil, les PDF de cours).

---

## 2. Base de Données (Schéma Logique)

Le backend doit gérer les entités suivantes.

### 👤 Users (Étudiants & Alumni)
* `id`: Primary Key
* `matricule`: String (Unique, ex: "MET-2025-045")
* `email`: String (Unique)
* `password_hash`: String
* `full_name`: String
* `role`: Enum ('STUDENT', 'ADMIN', 'ALUMNI')
* `filiere`: String (ex: "Génie Logiciel")
* `promo`: String (ex: "Licence 3")
* `status`: Enum ('ACTIVE', 'PENDING', 'ALUMNI') - *Détermine l'accès à l'E-Carte*
* `xp_points`: Integer (Gamification, defaut: 0)
* `badges`: JSON Array (ex: `["Major", "Contributeur"]`)
* `is_verified`: Boolean (Indispensable pour le vote)

### 🎓 Courses (Cours & Bibliothèques)
* `id`: Primary Key
* `title`: String
* `instructor`: String
* `filiere_tag`: String (Info/HEC)
* `level`: String (L1, L2...)
* `video_url`: String
* `thumbnail_url`: String (Pour le Lazy Loading)
* `duration`: String

### 📈 UserProgress (Suivi des Cours)
* `user_id`: Foreign Key -> Users
* `course_id`: Foreign Key -> Courses
* `progress_percent`: Integer (0-100)
* `is_completed`: Boolean

### 🗳️ Elections (Système de Vote)
* `id`: Primary Key
* `year`: Integer (2026)
* `is_open`: Boolean (Si false, le menu est caché)
* **Table Candidates :**
    * `election_id`: FK
    * `name`, `photo_url`, `manifesto` (Programme), `promo`
    * `vote_count`: Integer
* **Table Votes (Sécurité) :**
    * `user_id`: FK (Unique par élection -> Un étudiant ne vote qu'une fois)
    * `candidate_id`: FK
    * `timestamp`: Date

### 💼 Jobs (Career Center)
* `id`: Primary Key
* `title`, `company`, `logo_url`
* `type`: Enum ('Stage', 'CDD', 'Bénévolat')
* `location`: String
* `description`: Text

---

## 3. Endpoints API (Routes)

Le frontend attend ces routes précises. Toutes les réponses doivent être en JSON.

### 🔐 Authentification (Auth)

* `POST /api/auth/login`
    * **Body:** `{ email, password }`
    * **Réponse:** `{ token, user: { id, name, role, matricule, ... } }`
    * *Note : Renvoyer toutes les infos pour remplir le Dashboard et l'E-Carte immédiatement.*

* `POST /api/auth/register`
    * **Body:** `{ email, password, matricule, fullName ... }`
    * **Logique :** Vérifier si le matricule existe dans la base de l'école (si possible) ou mettre le compte en `status: PENDING`.

### 👤 Espace Membre (Dashboard)

* `GET /api/user/profile` (Protected)
    * Renvoie les stats (XP, Badges) et l'état de la cotisation (pour afficher "Membre Actif").

* `POST /api/user/update-cv` (Protected)
    * Permet de sauvegarder les infos du Career Center (Compétences, Expériences) pour ne pas les perdre.

### 📚 Cours (Knowledge)

* `GET /api/courses`
    * **Query Params :** `?filiere=Informatique&level=L3`
    * Permet le filtrage dynamique.

* `POST /api/courses/:id/progress` (Protected)
    * **Body:** `{ progress: 50 }`
    * Met à jour la barre de progression. Si 100%, ajouter des XP à l'étudiant (+100 XP).

### 🗳️ Élections (Zone Critique)

* `GET /api/elections/current`
    * Renvoie la liste des candidats et le statut de l'élection.
    * **Important :** Renvoyer un champ `user_has_voted: boolean` pour savoir si l'utilisateur connecté a déjà voté (pour bloquer le bouton).

* `POST /api/elections/vote` (Protected)
    * **Body:** `{ candidate_id }`
    * **Règles de sécurité :**
        1. Vérifier le token JWT.
        2. Vérifier si `user.is_verified` est TRUE.
        3. Vérifier dans la table `Votes` si l'ID utilisateur a déjà voté pour cette élection.
        4. Si tout est OK : Incrémenter le compteur candidat + Enregistrer le vote + Renvoyer succès.

### 🌐 Réseau & News

* `GET /api/alumni`
    * Liste des anciens avec pagination (pour ne pas charger 1200 profils d'un coup).
* `GET /api/news`
    * Articles et événements triés par date.

---

## 4. Règles de Sécurité & Performance

1.  **Images Optimisées :**
    * Le backend doit renvoyer des URLs d'images légères (compressées) pour les miniatures (News, Showroom, Cours) afin que le *Lazy Loading* du frontend soit efficace.

2.  **Protection des Routes :**
    * Toutes les routes `/api/user/*`, `/api/elections/vote` et `/api/courses/progress` doivent exiger un **Header Authorization** valide (`Bearer <token>`).

3.  **Gestion des Erreurs :**
    * Renvoyer les bons codes HTTP :
        * `200 OK` : Succès.
        * `401 Unauthorized` : Token invalide ou expiré (Le frontend redirigera vers Login).
        * `403 Forbidden` : Accès refusé (Ex: un non-membre essaie de voter).
        * `404 Not Found` : Ressource introuvable.

---

**Note pour le Dev :**
Le frontend gère déjà les états de chargement (`<Loading />`) et les pages 404. Concentrez-vous sur la rapidité des réponses JSON et la sécurité des données.