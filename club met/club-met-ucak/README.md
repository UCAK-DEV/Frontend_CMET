
# 🌍 CLUB MET - UCAK (Frontend)

Plateforme officielle du Club Métiers et Technologies de l'Université Cheikh Ahmadoul Khadim (UCAK).
Ce projet est une Single Page Application (SPA) développée avec React.js.

## 🛠 Technologies

- **Core** : React 18, Vite
- **Styling** : Tailwind CSS (Mode Sombre/Clair natif)
- **Animations** : Framer Motion
- **Icons** : Lucide React
- **Routing** : React Router DOM
- **PDF Generation** : Window Print API (Native)

## 🚀 Installation & Démarrage

1. **Cloner le projet**
   ```bash
   git clone [https://github.com/votre-repo/club-met-frontend.git](https://github.com/votre-repo/club-met-frontend.git)
   cd club-met-frontend

```

2. **Installer les dépendances**
```bash
npm install

```


3. **Lancer le serveur de développement**
```bash
npm run dev

```


L'application sera accessible sur `http://localhost:5173`.

## 📂 Structure du Projet

* `src/components` : Composants réutilisables (Navbar, Footer, Hero...).
* `src/pages` : Les vues principales (Dashboard, News, CareerCenter...).
* `src/assets` : Images et logos.
* `src/index.css` : Configuration Tailwind et styles globaux.

---

**Développé avec ❤️ par la Team Tech UCAK.**

```

---

### 2. Le Cahier des Charges API (`API_SPECS.md`)
*C'est le document le plus important pour le Backend. Il liste les données dont ton Frontend a besoin. Crée un fichier `API_SPECS.md`.*

```markdown
# 🔌 Spécifications API (Backend Requirements)

Le Frontend attend une API RESTful retournant du JSON.
Base URL suggérée : `/api/v1`

## 1. Authentification (`/auth`)

### POST `/auth/login`
- **Request** : `{ email, password }`
- **Response** : `{ token, user: { id, name, role, avatar } }`

### POST `/auth/register`
- **Request** : `{ name, email, password, promo, departement }`

## 2. Utilisateur & Dashboard (`/user`)

### GET `/user/profile`
- **Headers** : `Authorization: Bearer <token>`
- **Response** :
  ```json
  {
    "id": 1,
    "name": "Moussa Diop",
    "promo": "Licence 3 GL",
    "id_number": "MET-2024-045",
    "xp": 1250,
    "rank": 12,
    "badges": ["Génie du Code", "Expert"]
  }

```

## 3. Actualités (`/news`)

### GET `/news`

* **Query Params** : `?category=tech` (optionnel)
* **Response** : Liste des articles et événements.
```json
[
  {
    "id": 1,
    "title": "Hackathon 2025",
    "date": "15 Oct 2025",
    "category": "Tech",
    "image": "url_image",
    "excerpt": "Description courte..."
  }
]

```



## 4. Savoir & Cours (`/knowledge`)

### GET `/courses`

* **Response** : Liste des formations vidéo.
* **Format** : `{ id, title, author, progress, duration, video_url, modules: [...] }`

### GET `/documents`

* **Query Params** : `?filiere=Informatique&level=L3`
* **Response** : Liste des fichiers PDF/EPUB.
```json
[
  {
    "id": 10,
    "title": "Cours React Avancé",
    "type": "PDF",
    "download_url": "link_to_file",
    "size": "5MB"
  }
]

```



## 5. Annuaire (`/showroom`)

### GET `/talents`

* **Response** : Liste des étudiants visibles publiquement.

### GET `/projects`

* **Response** : Liste des projets réalisés par le club.

```

👏

```