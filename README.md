# IEM BSH Frontend

React SPA for the IEM BSH Department website, built with Create React App + CRACO, styled with Tailwind CSS and shadcn/ui components, deployed on Vercel.

## Tech Stack

- **Framework**: React 18
- **Routing**: React Router v6
- **Styling**: Tailwind CSS + shadcn/ui (Radix UI primitives)
- **HTTP Client**: Axios
- **Animations**: Framer Motion
- **Build Tool**: CRACO (Create React App Configuration Override)
- **Deployment**: Vercel

## Project Structure

```
frontend/
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
└── package.json
```

## Environment Variables

Create a `.env` file in the `frontend/` directory:

```env
# URL of the backend API (no trailing slash)
REACT_APP_BACKEND_URL=https://your-backend.vercel.app

# Set to false to disable health check polling
ENABLE_HEALTH_CHECK=false
```

> In production, set `REACT_APP_BACKEND_URL` to your deployed backend URL in the Vercel dashboard.

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm start
```

The app will be available at `http://localhost:3000`. Make sure the backend is running (or `REACT_APP_BACKEND_URL` points to the deployed backend).

## Build & Deployment (Vercel)

```bash
# Production build
npm run build
```

The `build` script uses `CI=false` to prevent warnings from failing the build. The output goes to the `build/` directory.

For Vercel, connect the `frontend/` directory as the project root. Vercel will auto-detect Create React App and run `npm run build`. Set environment variables in the Vercel dashboard.

### Required Vercel Environment Variables

```
REACT_APP_BACKEND_URL=https://your-backend.vercel.app
```

## Service Dependencies

| Service | Purpose |
|---|---|
| Backend API | All data (faculty, events, notices, etc.) |
| Vercel | Hosting / CDN |

No database, S3, or other services are required directly by the frontend — all data is fetched from the backend API.

## Admin Panel

The admin panel is accessible at `/admin`. Login with the credentials configured in the backend. The admin panel provides full CRUD management for all content sections of the website.
