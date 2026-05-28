# IEM BSH Frontend

React SPA for the IEM BSH Department website, built with Create React App + CRACO, styled with Tailwind CSS and shadcn/ui components, deployed on Firebase Hosting.

## Tech Stack

- **Framework**: React 18
- **Routing**: React Router v6
- **Styling**: Tailwind CSS + shadcn/ui (Radix UI primitives)
- **HTTP Client**: Axios
- **Animations**: Framer Motion
- **Build Tool**: CRACO (Create React App Configuration Override)
- **Deployment**: Firebase Hosting

## Project Structure

```
/
├── public/
│   └── puppeteer_assets/   # Static images (faculty photos, awards, etc.)
├── src/
│   ├── components/
│   │   ├── admin/          # Admin layout, CRUD manager, protected route
│   │   ├── layout/         # Shared layout components (navbar, footer, etc.)
│   │   └── ui/             # Reusable UI primitives
│   ├── contexts/
│   │   ├── AuthContext.jsx  # Admin auth state
│   │   └── DataContext.jsx  # Global data fetching/caching
│   ├── hooks/
│   │   └── useData.js       # Data access hook
│   ├── lib/
│   │   ├── api.js           # Axios API client + all endpoint functions
│   │   ├── adminApi.js      # Admin-specific API calls
│   │   └── utils.js         # Utility helpers
│   └── pages/              # Route-level page components
│       ├── admin/           # Admin dashboard pages
│       └── *.jsx            # Public pages
├── craco.config.js          # Webpack alias config (@/ → src/)
├── firebase.json            # Firebase Hosting config (SPA rewrite)
├── .firebaserc              # Firebase project alias (iem-bshs)
└── package.json
```

## Environment Variables

Create a `.env` file in the project root:

```env
# URL of the backend API (no trailing slash)
REACT_APP_BACKEND_URL=https://bshs-api.iem.edu.in

# Set to false to disable health check polling
ENABLE_HEALTH_CHECK=false
```

> In production, `REACT_APP_BACKEND_URL` is set directly in the GitHub Actions workflow — no hosting dashboard configuration is required.

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm start
```

The app will be available at `http://localhost:3000`. Make sure the backend is running (or `REACT_APP_BACKEND_URL` points to the deployed backend).

## Build & Deployment (Firebase Hosting)

```bash
# Production build
npm run build
```

The `build` script uses `CI=false` to prevent warnings from failing the build. The output goes to the `build/` directory, which Firebase Hosting serves as configured in `firebase.json`.

### CI/CD

Deployments are automated via GitHub Actions:

- **Push to `main`** → builds and deploys to the live Firebase Hosting channel (project `iem-bshs`).
- **Pull request** → builds and deploys to a temporary preview channel; a link is posted automatically to the PR.

No manual `firebase deploy` is needed for normal releases.

### Manual deploy (optional)

```bash
npm run build
firebase deploy --only hosting
```

## Service Dependencies

| Service | Purpose |
|---|---|
| Backend API | All data (faculty, events, notices, etc.) |
| Firebase Hosting | Static hosting / CDN |

No database, S3, or other services are required directly by the frontend — all data is fetched from the backend API.

## Admin Panel

The admin panel is accessible at `/admin`. Login with the credentials configured in the backend. The admin panel provides full CRUD management for all content sections of the website.
