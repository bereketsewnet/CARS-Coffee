# CARE Coffee: Production Deployment & Packaging Guide

This guide explains exactly how to prepare, clean, and package your CARE Coffee Next.js project for production deployment. It covers which files/folders to include or exclude, how to zip the project, and the steps for a successful upload and launch.

---

## 1. Clean the Project for Production

Before packaging, make sure your build is fresh and no unnecessary files are included:

### a. Remove Old Build and Cache

```powershell
Remove-Item -Recurse -Force .next
```

### b. Rebuild the Project

```powershell
npm run build
```

---

## 2. What to Include in the Production Zip

**Include:**

- `src/` (all source code)
- `public/` (all static assets, uploads, images, etc.)
- `prisma/` (schema, migrations, seed scripts)
- `generated/` (Prisma client and generated types)
- `.next/` (don't forgot this mainly)
- `package.json`, `package-lock.json` or `bun.lockb`
- `next.config.ts`, `tsconfig*.json`, `tailwind.config.ts`, `postcss.config.js`, `eslint.config.js`, `web.config`, etc.
- `.env.example, .env, .env.local` make it inducde
- Any other config/scripts needed for deployment

**Do NOT include:**

- `node_modules/` (will be reinstalled on server)
- `.vscode/`, `.git/`, `.DS_Store`, `*.log`, or any local/editor files

---

## 3. How to Create the Production Zip

From your project root, run:

```powershell
tar -a -c -f CARES_Prod_new.zip --exclude node_modules --exclude .next --exclude .vscode --exclude .git --exclude '*.log' --exclude '.env.local' .
```

- This creates `CARES_Prod_new.zip` with only the necessary files for production.

---

## 4. Upload & Extract on Server

1. Upload `CARES_Prod_new.zip` to your server (via cPanel, SFTP, or SSH).
2. Extract the zip in your desired directory.
3. On the server, run:
   - `npm install` (to install dependencies)
   - Copy `.env.example` to `.env` and fill in production values
   - `npx prisma migrate deploy` (to sync DB)
   - `npm run db:seed` (to create admin user, if needed)
   - `npm run build` (to build .next on server)
   - `npm run start` or use PM2 for background running

---

## 5. Checklist Before Launch

- [ ] `.env` is set up with correct secrets and DB URL
- [ ] All uploads/images are present in `public/`
- [ ] No `node_modules`, `.next`, or local files in the zip
- [ ] App builds and starts without errors

---

## 6. Troubleshooting

- If your zip is much larger than expected, check for accidentally included `node_modules`, `.next`, or other large folders.
- If you get permission errors, make sure the zip file is not open in any program before zipping.
- Always rebuild on the server for the correct environment.

---

**This guide ensures your deployment is clean, secure, and minimal for best performance and security.**
