# SuwaMaga - Sri Lanka Dengue Alert & Community Action Portal

SuwaMaga is a responsive MERN-stack public-health web application created for the SLIIT SE3090 Software Engineering Frameworks Mini Hackathon 2026. It helps residents of Sri Lanka's Western Province understand local dengue risk, report potential mosquito-breeding hazards, and follow community incident updates while supporting PHI inspection workflows.

> **Tagline:** Report risks. Verify hazards. Protect communities.

## Quick Links

| Resource | Link |
|---|---|
| Git repository | [github.com/ssshanaka/se3090-mini-hackathon](https://github.com/ssshanaka/se3090-mini-hackathon.git) |
| Deployed application | [se3090-mini-hackathon.vercel.app](https://se3090-mini-hackathon.vercel.app/) |
| Railway backend API | [se3090-mini-hackathon-production-5f73.up.railway.app](https://se3090-mini-hackathon-production-5f73.up.railway.app/) |
| Two-minute demonstration video | [Google Drive video folder](https://drive.google.com/drive/folders/1C6zYtkeAC4RiKMTtVIqd5a7YRgmiYb6G?usp=shari) |

## Selected Problem

Sri Lanka's Western Province—comprising the Colombo, Gampaha, and Kalutara districts—accounts for a significant proportion of the country's dengue cases. A major operational bottleneck is the delay between a mosquito-breeding site appearing and a Public Health Inspector (PHI) reaching it for inspection.

Residents currently have limited access to localized, real-time dengue-risk information. At the same time, health authorities need a direct and accessible crowdsourced channel for learning about stagnant water, blocked drains, uncovered containers, and other potential breeding sites as soon as residents discover them.

## Proposed Solution

SuwaMaga closes the gap between hazard discovery and PHI inspection through a responsive community web portal. Citizens can view dengue-risk information by Medical Officer of Health (MOH) division, report potential breeding sites with location details and optional photo evidence, and browse a public incident queue. PHI officers receive a dedicated view for monitoring zones, reviewing reported hazards, and updating incident statuses.

The platform focuses on clear public-health communication, privacy-conscious public reporting, mobile accessibility, and faster community-to-authority coordination.

## Main Features

### Authentication and role-based access

- Resident and PHI Officer registration and login.
- Password hashing with `bcryptjs`.
- JWT generation for authenticated sessions.
- Protected frontend routes and role-aware navigation.
- Separate resident and PHI experiences.

### Resident landing experience

- Responsive project landing page with clear calls to action.
- Direct access to hazard reporting, risk zones, and the Public Incident Queue.
- Public-health context explaining the impact of dengue in the Western Province.

### MOH Division Risk Directory

- Western Province MOH division directory backed by MongoDB seed data.
- Risk levels classified as High, Moderate, or Low.
- Search and risk-level filtering.
- Interactive Leaflet map for geographic risk visualization.
- Active-case counts and recommended public-health actions.

### Community Hazard Reporting

- Structured form for reporting possible mosquito-breeding locations.
- District and MOH division cross-validation.
- Hazard categories including stagnant water, blocked drains, uncovered containers, and discarded tyres or containers.
- Friendly client-side and server-side validation.
- Optional Cloudinary-backed image-upload infrastructure.
- Report storage in MongoDB Atlas.

### Public Incident Queue

- Live public feed loaded from `GET /api/reports`.
- Responsive incident cards showing hazard type, location, status, image, notes, and relative time.
- Newest reports displayed first.
- Text search across hazard type, district, MOH division, and notes.
- User-selectable MOH division filtering.
- Loading, empty, error, and retry states.
- Reporter names and contact numbers excluded from the public API response and interface.

### PHI dashboard and incident management

- Dashboard of MOH zones and their current risk levels.
- Detailed hazard view for each MOH division.
- Incident status updates: Pending, Inspected, and Cleared.
- Automatic synchronization of active incident counts and zone risk levels.

## Technology Stack

| Area | Technologies |
|---|---|
| Frontend | React 19, Vite 8, JavaScript, JSX |
| Styling | Tailwind CSS 4, responsive mobile-first design |
| Routing | React Router |
| Mapping | Leaflet, React Leaflet |
| Backend | Node.js, Express.js 5 |
| Database | MongoDB Atlas, Mongoose ODM |
| Authentication | JSON Web Tokens, bcryptjs |
| Image handling | Cloudinary, Multer, Multer Storage Cloudinary |
| API architecture | REST API with CORS |
| Frontend deployment | Vercel |
| Backend deployment | Railway |
| Version control | Git and GitHub |

## AI Tools Used

AI tools were used as development assistants for ideation, implementation guidance, debugging, UI refinement, merge-conflict analysis, and documentation. All generated suggestions were reviewed and integrated by the team.

- **Claude** — development guidance and solution exploration.
- **Antigravity** — AI-assisted implementation and workflow support.
- **ChatGPT** — debugging, code assistance, integration support, and documentation.

## Team Members and Contributions

| Member | Full name | Student ID | Main contribution |
|---|---|---|---|
| 1 | Jayaweera M. H. P | IT24102209 | MERN project setup, authentication, user schema and APIs, landing page, shared navigation, protected routes, and responsive application shell. |
| 2 | Ekanayaka S. R. W. M. S. S. B | IT24102223 | MOH Division Risk Directory, MOH seed data and API, risk-level processing, interactive map, PHI dashboard, zone details, and incident-status workflow. |
| 3 | Wijewantha W. K. S. B | IT24103190 | Community Hazard Reporting form, HazardReport schema, validation, Cloudinary upload setup, report submission API, and reporting UI. |
| 4 | Abeykoon D. M. D. N | IT24102379 | Public Incident Queue UI, incident cards, reports retrieval integration, search and MOH filtering, privacy-conscious public data presentation, responsive UX, Railway frontend API integration, and integration support. |

## Application Architecture

```text
React + Vite frontend (Vercel)
              |
              | HTTPS REST requests
              v
Node.js + Express API (Railway)
          |                |
          v                v
   MongoDB Atlas       Cloudinary
```

## Project Structure

```text
denguespot-lk/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── features/incident-queue/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   ├── package.json
│   └── vite.config.js
└── backend/
    ├── src/
    │   ├── config/
    │   ├── constants/
    │   ├── controllers/
    │   ├── middleware/
    │   ├── models/
    │   └── routes/
    └── package.json
```

## Installation

### Prerequisites

- Node.js 22 or a compatible current LTS release.
- npm.
- A MongoDB Atlas connection string.
- Cloudinary credentials if image uploads are required.

### 1. Clone the repository

```bash
git clone https://github.com/ssshanaka/se3090-mini-hackathon.git
cd se3090-mini-hackathon
```

### 2. Install backend dependencies

```bash
cd denguespot-lk/backend
npm install
```

Create `denguespot-lk/backend/.env`:

```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secure_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Cloudinary variables are optional for running the main application, but image upload will be unavailable without them. Never commit `.env` or real credentials to Git.

### 3. Install frontend dependencies

From the repository root:

```bash
cd denguespot-lk/frontend
npm install
```

Create `denguespot-lk/frontend/.env` when a custom API deployment is required:

```env
VITE_API_URL=https://se3090-mini-hackathon-production-5f73.up.railway.app
```

The Railway URL above is also the frontend's default API URL.

## Running the Application Locally

Open two terminals from the repository root.

### Terminal 1 — Backend

```bash
cd denguespot-lk/backend
npm run dev
```

The local API runs at `http://localhost:5000`.

### Terminal 2 — Frontend

To use the local backend, create or update `denguespot-lk/frontend/.env`:

```env
VITE_API_URL=http://localhost:5000
```

Then run:

```bash
cd denguespot-lk/frontend
npm run dev
```

Open the URL printed by Vite, normally `http://localhost:5173`.

## Production Build

```bash
cd denguespot-lk/frontend
npm run build
npm run preview
```

The optimized frontend output is created in `frontend/dist`.

## Main API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Check backend and database availability |
| POST | `/api/auth/signup` | Register a resident or PHI user |
| POST | `/api/auth/login` | Authenticate a user |
| GET | `/api/moh-zones` | Retrieve MOH divisions and risk data |
| POST | `/api/reports` | Submit a dengue hazard report |
| GET | `/api/reports` | Retrieve public hazard reports, newest first |
| GET | `/api/reports/zone/:mohName` | Retrieve reports for one MOH division |
| PATCH | `/api/reports/:id/status` | Update an incident's PHI workflow status |
| POST | `/api/upload` | Upload optional hazard imagery |

## Deployed Application

- **Live frontend:** [https://se3090-mini-hackathon.vercel.app/](https://se3090-mini-hackathon.vercel.app/)
- **Railway API:** [https://se3090-mini-hackathon-production-5f73.up.railway.app/](https://se3090-mini-hackathon-production-5f73.up.railway.app/)
- **API health check:** [https://se3090-mini-hackathon-production-5f73.up.railway.app/api/health](https://se3090-mini-hackathon-production-5f73.up.railway.app/api/health)

## Demonstration Video

Watch the two-minute project demonstration here:

[SuwaMaga demonstration video — Google Drive](https://drive.google.com/drive/folders/1C6zYtkeAC4RiKMTtVIqd5a7YRgmiYb6G?usp=shari)

## Academic Context

SuwaMaga is a non-commercial university mini-hackathon prototype developed for educational purposes. It demonstrates how a modern web stack can improve community reporting and public-health visibility; it is not an official Sri Lankan Ministry of Health system or a substitute for emergency or medical services.
