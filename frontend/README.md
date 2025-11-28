# Arthaniti 



## Prerequisites

- Node.js (LTS recommended)
- npm (comes with Node) or yarn
- Git
- Recommended: `nvm` to manage Node versions

If you don't have these installed, follow the OS-specific sections below.

---

## Quick setup (cross-platform)

Open a terminal and run these commands from the repo root.

1. Change to the frontend folder:

```bash
cd frontend/finance_manager
```

2. Install dependencies:

```bash
npm install
# or, if you prefer yarn:
# yarn install
```

3. Run the dev server (Vite):

```bash
npm run dev
```

4. Open the URL printed by Vite (usually `http://localhost:5173`).

5. Build for production:

```bash
npm run build
npm run preview
```

---

## Full OS-specific setup

Choose your OS and follow the commands.

### macOS (recommended flow)

1. Install Homebrew (if not installed):

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

2. Install Git and optionally `nvm`:

```bash
brew install git
brew install nvm
```

3. Install Node via nvm (recommended):

```bash
mkdir -p "$HOME/.nvm"
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.6/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm install --lts
nvm use --lts
node -v && npm -v
```

4. From repo root, install and run:

```bash
cd frontend/finance_manager
npm install
npm run dev
```

### Ubuntu / Debian (Linux)

1. Install Node (using NodeSource) and Git:

```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs git build-essential
node -v && npm -v
```

2. Install project deps and run:

```bash
cd frontend/finance_manager
npm install
npm run dev
```

### Windows (PowerShell)

1. Install Node (recommended installer from nodejs.org) and Git for Windows.

2. Open PowerShell and run:

```powershell
cd 'C:\path\to\repo\frontend\finance_manager'
npm install
npm run dev
```

If you use WSL2, follow the Linux instructions inside WSL.

---

## Common commands

- Install dependencies: `npm install` or `yarn install`
- Run dev server: `npm run dev`
- Build: `npm run build`
- Preview build: `npm run preview`
- Lint (if configured): `npm run lint`

---

## Dependencies used in this project

The frontend depends on a set of runtime and dev packages. Below are the main packages used in this project and commands to install them if you need to add or re-install individually.

- Runtime dependencies (included in `package.json`):
	- `react` & `react-dom` — core UI library
	- `react-router-dom` — routing
	- `recharts` — charts used in dashboards and reports
	- `lucide-react` — SVG icons used in the sidebar and UI
	- `@mui/material`, `@mui/x-charts`, `@emotion/react`, `@emotion/styled` — Material UI and charting helpers
	- `reactstrap` — some UI components (if used)

Install runtime dependencies (example):

```bash
# install core runtime deps
npm install react react-dom react-router-dom recharts lucide-react @mui/material @mui/x-charts @emotion/react @emotion/styled reactstrap
```

- Dev dependencies (tooling already in `package.json`):
	- `vite` — dev server / bundler
	- `tailwindcss`, `postcss`, `autoprefixer` — styling and PostCSS pipeline
	- `eslint` and related plugins — linting

Install dev tooling (example):

```bash
# install dev tools
npm install -D vite tailwindcss postcss autoprefixer eslint @vitejs/plugin-react
```

Notes:
- You normally don't need to run the above install lines if you run `npm install` from the project root — they are provided if you need to add a missing package or reproduce a smaller install.
- If you see an error like "Module does not provide an export named 'X'", double-check the package name and version; a full reinstall can help:

```bash
rm -rf node_modules package-lock.json
npm install
```

## Install individual packages (explicit commands)

If you need to install specific libraries individually (for example to match versions or add a missing package), use the commands below. Versions shown match this project's `package.json` at the time of writing — you can omit the `@version` to get the latest.

- Runtime packages (install all at once):

```bash
npm install react@^18.3.1 react-dom@^18.3.1 react-router-dom@^7.1.1 lucide-react@^0.471.0 recharts@^2.15.0 @mui/material@^6.3.1 @mui/x-charts@^7.23.6 @emotion/react@^11.14.0 @emotion/styled@^11.14.0 reactstrap@^9.2.3
```

- If you prefer to install one-by-one (examples):

```bash
npm install lucide-react@^0.471.0
npm install recharts@^2.15.0
npm install react-router-dom@^7.1.1
```

- Dev tooling (install as dev-dependencies):

```bash
npm install -D vite@^6.0.5 tailwindcss@^3.4.17 postcss@^8.4.32 autoprefixer@^10.4.17 @vitejs/plugin-react@^4.3.4 eslint@^9.17.0
```

- TypeScript / types (if using types):

```bash
npm install -D @types/react@^18.3.18 @types/react-dom@^18.3.5 @types/react-router-dom@^5.3.3
```

- Tailwind setup helper (generates `tailwind.config.js` and `postcss.config.js` if needed):

```bash
npx tailwindcss init -p
```

Notes:
- Use `npm install` from the project root to install everything from `package.json` in one step — the single-package commands above are for targeted installs or troubleshooting.
- If you bump package versions, run the app locally and check for breaking changes (especially for major version updates of React, MUI, Recharts, or lucide-react).

## Git / Push workflow

Example branch workflow:

```bash
# configure user (one-time)
git config --global user.name "Your Name"
git config --global user.email "you@example.com"

# create a branch
git checkout -b feature/sidebar

# stage & commit
git add .
git commit -m "Add AppLayout sidebar and integrate into pages"

# push to remote
git push -u origin feature/sidebar
```

If you need to set a remote:

```bash
git remote add origin git@github.com:yourusername/yourrepo.git
git push -u origin feature/sidebar
```

---

## Troubleshooting

- "Module does not provide an export named 'X'": ensure `lucide-react` is the expected version; remove `node_modules` and reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

- If you see Tailwind-related or CSS issues, ensure `postcss` and `tailwindcss` dependencies are installed (they are included in `package.json` in this project).

- For Apple Silicon (M1/M2) native module issues, try `arch -x86_64 npm install` or use `node` built for arm64 (recommended) and reinstall native deps.

---

## Files of interest

- `src/` — React source
- `src/components/Sidebar/AppLayout.jsx` — the new sliding sidebar layout
- `package.json` — project scripts & dependencies
- `vite.config.js` — Vite configuration
- `postcss.config.js`, `tailwind.config.js` — styling setup

---

---

## Clone for teammates

Your teammates can clone the repository using SSH or HTTPS and get started quickly.

```bash
# SSH (recommended if teammates have SSH keys configured)
git clone git@github.com:yourusername/yourrepo.git
cd yourrepo/frontend/finance_manager
npm install
npm run dev

# or using HTTPS:
git clone https://github.com/yourusername/yourrepo.git
cd yourrepo/frontend/finance_manager
npm install
npm run dev
```

If teammates will work on a feature branch, they can create and push one:

```bash
git checkout -b feature/your-feature
git push -u origin feature/your-feature
```

Replace `yourusername/yourrepo` with the actual repository path.


