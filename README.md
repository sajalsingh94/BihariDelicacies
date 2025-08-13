# Bihari Delicacies

Simple full-stack web app to showcase and sell authentic Bihari snacks. Users can sign up, log in, and upload products with images. Includes categories and traditional recipes.

## Tech Stack
- Frontend: HTML, CSS, JavaScript (vanilla)
- Backend: Node.js, Express, SQLite
- Auth: Email + Password (session-based)
- File Uploads: multer (stored under `backend/uploads`)

## Project Structure
```
/workspace
  ├── backend
  │   ├── server.js
  │   ├── db.js
  │   ├── routes/
  │   │   ├── auth.js
  │   │   ├── products.js
  │   │   └── recipes.js
  │   └── uploads/            # created at runtime if missing
  └── frontend
      ├── index.html
      ├── categories.html
      ├── recipes.html
      ├── upload.html
      ├── login.html
      ├── signup.html
      ├── styles.css
      └── js/
          ├── api.js
          ├── common.js
          ├── home.js
          ├── categories.js
          ├── recipes.js
          ├── upload.js
          └── auth.js
```

## Getting Started

1. Install dependencies
```bash
cd backend
npm install
```

2. Run the server (dev)
```bash
npm run dev
```

This starts Express at `http://localhost:3000` and serves the frontend statically from the `frontend` folder.

3. Open the app
- Home: `http://localhost:3000/`
- Categories: `http://localhost:3000/categories.html`
- Recipes: `http://localhost:3000/recipes.html`
- Upload (requires login): `http://localhost:3000/upload.html`

4. Build/DB
- SQLite database file is created at `backend/data.sqlite` on first run.
- Initial seed inserts several traditional Bihari recipes.

## Environment
- Optional: set `SESSION_SECRET` for session signing.

## Notes
- This app is for demo/learning. Do not use default MemoryStore for production.
- Uploaded images are saved under `backend/uploads` and served via `/uploads/*` URLs.