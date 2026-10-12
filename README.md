# MaizeBus Web Application

A full-stack web application for MaizeBus, built with React (Vite) frontend and Node.js (Express) backend.

## Project Structure

```
maizebus-web/
├── client/          # React frontend (Vite + TypeScript)
├── server/          # Node.js backend (Express + TypeScript)
├── floorplantool/   # Floor Plan Digitizer — git submodule (internal tool, see below)
├── scripts/         # build-floorplantool.sh (CI glue for the tool)
├── package.json     # Root package.json with workspace configuration
└── README.md
```

## Prerequisites

- Node.js (>= 18.0.0)
- npm (>= 8.0.0)

## Quick Start

1. **Install all dependencies:**
   ```bash
   npm run install:all
   ```

2. **Start development servers:**
   ```bash
   npm run dev
   ```
   This will start both the frontend (port 5173) and backend (port 3001) concurrently.

3. **Access the application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## Available Scripts

### Root Level Scripts
- `npm run dev` - Start both client and server in development mode
- `npm run build` - Build both client and server for production
- `npm run start` - Start both client and server in production mode
- `npm run install:all` - Install dependencies for all workspaces
- `npm run clean` - Remove all node_modules directories
- `npm run lint` - Run linting for both client and server

### Client Scripts (in `client/` directory)
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Server Scripts (in `server/` directory)
- `npm run dev` - Start server with nodemon
- `npm run build` - Compile TypeScript
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Environment Variables

### Server Environment Variables
Create a `.env` file in the `server/` directory:

```env
PORT=3001
FRONTEND_URL=http://localhost:5173
EMAIL_HOST=smtp.zoho.com
EMAIL_PORT=465
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_TO=contact@maizebus.com
```

## Development

### Frontend (Client)
- Built with React 19, TypeScript, and Vite
- Uses Tailwind CSS for styling
- Includes Radix UI components
- Located in `client/` directory

### Backend (Server)
- Built with Express.js and TypeScript
- Handles contact forms and file uploads
- Uses Nodemailer for email functionality
- Located in `server/` directory

## Deployment

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Start production servers:**
   ```bash
   npm run start
   ```

## Floor plan tool (internal, unlisted)

The [Floor Plan Digitizer](https://github.com/i-kumar/floorplandigitizer) is
deployed alongside the site at **https://www.maizebus.com/floorplantool/**. It
is deliberately not linked from the navbar or anywhere else on the site —
share the URL directly.

It lives in its own repository and is pulled in here as a git submodule
(`floorplantool/`). The frontend deploy workflow builds it separately
(`scripts/build-floorplantool.sh`, Vite base `/floorplantool/`) and copies the
output into `client/dist/floorplantool/` before uploading to GitHub Pages. The
site's React app never imports it, so the two apps share no dependencies.

```bash
# Fresh clone: fetch the submodule too
git clone --recurse-submodules https://github.com/mbusdev/maizebus-web.git
# ...or, in an existing clone
git submodule update --init

# Ship a newer version of the tool: move the pointer to its latest main and push
git submodule update --remote floorplantool
git add floorplantool && git commit -m "Update floor plan tool" && git push

# Build the full site locally (client first — it wipes client/dist)
cd client && npm ci && npm run build && cd ..
bash scripts/build-floorplantool.sh
```

Develop the tool in its own repo (`cd floorplantool && npm run dev`, or clone
it separately); the submodule here only pins which commit is deployed.

## License

MIT License - see LICENSE file for details
