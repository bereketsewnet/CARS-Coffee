# CARE Coffee: Full Production Deployment Guide

This guide covers the step-by-step process of deploying the **CARE Coffee** Next.js application to a production server (such as cPanel, a VPS, or any environment supporting Node.js and MySQL).

---

## Step 1: Prepare the MySQL Database
Before transferring your code, you need a live database for the application to connect to. 

If using **cPanel**:
1. Open your cPanel dashboard and go to **MySQL® Databases**.
2. **Create a New Database** (e.g., `carecoffee_db`).
3. **Create a New User** under "MySQL Users" and generate a strong password. Save this password!
4. **Add the User to the Database**: Scroll down, select your new user and new database, click "Add", and grant **ALL PRIVILEGES**.

Your database connection URL is now ready to be built. It will look like this:
`mysql://[DB_USER]:[DB_PASSWORD]@localhost:3306/[DB_NAME]`
*(Note: If your database is hosted on a separate server, replace `localhost` with the database server's IP address).*

---

## Step 2: Transfer Files to the Server
Upload the project files to your production server. 
- **Important:** Do NOT upload the `node_modules` folder, the `.next` folder, or your local `.env.local` file. 
- Instead, upload the source code (`src`, `prisma`, `public`, `package.json`, etc.) using Git, FTP, or cPanel File Manager.

---

## Step 3: Configure Environment Variables
Inside your production server folder where you uploaded the files:
1. Copy `.env.example` and rename it to exactly `.env`.
2. Open the `.env` file and fill in **all** the required production values:

```env
# Generate a secure string for this by running: openssl rand -base64 32
AUTH_SECRET=your_new_secure_random_string_here

# Put your actual live website domain here
NEXTAUTH_URL=https://yourdomain.com

# Your live database connection string from Step 1
DATABASE_URL="mysql://username:password@localhost:3306/database_name"

# (Optional but recommended) Resend keys to enable contact forms/password resets
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=noreply@yourdomain.com
RESEND_ADMIN_EMAIL=admin@yourdomain.com

# Initial Admin Credentials (used once during the seeding step)
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=MySuperSecretPassword123!
```

---

## Step 4: Install Dependencies
Open a terminal (or SSH) into your project folder on the production server and run:

```bash
npm install
```
*This will install Next.js, Prisma, MariaDB connectors, and all other required packages.*

---

## Step 5: Initialize Production Database
Now that your `.env` is configured and packages are installed, you need to push the empty table structures to your new MySQL database and create your admin account.

Run the production migration command to sync the tables safely:
```bash
npx prisma migrate deploy
```

Next, run the seed script. This reads the `ADMIN_EMAIL` and `ADMIN_PASSWORD` from your `.env` file to create your very first admin login, along with some default placeholder framework:
```bash
npm run db:seed
```

---

## Step 6: Build the Application
Next.js needs to compile the React code into optimized, static production HTML and server-side logic. 
Run the build command:

```bash
npm run build
```
*(If this succeeds with "Exit code: 0", your app is structurally perfect and ready to serve!)*

---

## Step 7: Start the Live Production Server
If you are running on a clean VPS (like DigitalOcean or AWS), the best way to keep your Node.js app running forever in the background is to use **PM2**:

1. Install PM2 globally: `npm install -g pm2`
2. Start the application: `pm2 start npm --name "care-coffee" -- start`
3. Ensure it runs on server reboots: `pm2 save` && `pm2 startup`

**If using cPanel (Setup Node.js App interface):**
1. Go to **Setup Node.js App** in cPanel.
2. Click **Create Application**.
3. Choose your Node.js version (Recommended: Node 18+).
4. Set the **Application root** to your file directory.
5. Set the **Application URL** to your domain.
6. Set the **Startup file** to `node_modules/next/dist/bin/next` (or run it via `npm run start`).
7. Save and **Start** the application.

---

## Step 8: Login and Manage Live Content
1. Navigate to your live website: `https://yourdomain.com/admin`
2. Log in using the `ADMIN_EMAIL` and `ADMIN_PASSWORD` you defined.
3. You can now use the admin dashboard panels to safely replace the static fallback data with real, live publications, team members, news events, and impact metrics!
