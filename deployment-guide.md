# Deployment Guide for Mangola

This guide will help you deploy the Mangola e-commerce application to your personal VPS (Virtual Private Server).

## Prerequisites

- A VPS with SSH access (Ubuntu 20.04 LTS or higher recommended)
- A domain name pointing to your VPS
- PostgreSQL database installed on your VPS or a managed PostgreSQL service
- Node.js 18+ installed on your VPS
- PM2 for process management (`npm install -g pm2`)
- Nginx for reverse proxy

## Step 1: Clone and Prepare the Application

1. Connect to your VPS via SSH

   ```bash
   ssh username@your-vps-ip
   ```

2. Create a directory for your application

   ```bash
   mkdir -p /var/www/mango-paradise
   cd /var/www/mango-paradise
   ```

3. Clone your repository or upload your files to this directory

4. Install dependencies

   ```bash
   npm install
   ```

5. Create a `.env` file with your production environment variables
   ```bash
   cp .env.example .env
   # Edit the .env file with your production values
   nano .env
   ```

## Step 2: Set Up the Database

1. Create a PostgreSQL database for the application

   ```bash
   sudo -u postgres psql
   ```

2. In the PostgreSQL shell, create a database and user

   ```sql
   CREATE DATABASE mango_paradise;
   CREATE USER mango_user WITH ENCRYPTED PASSWORD 'your-strong-password';
   GRANT ALL PRIVILEGES ON DATABASE mango_paradise TO mango_user;
   \q
   ```

3. Update your `.env` file with the database connection information

   ```
   DATABASE_URL="postgresql://mango_user:your-strong-password@localhost:5432/mango_paradise"
   ```

4. Run database migrations
   ```bash
   npx prisma migrate deploy
   ```

## Step 3: Build the Application

1. Build the SvelteKit application
   ```bash
   npm run build
   ```

## Step 4: Set Up PM2 for Process Management

1. Create a PM2 configuration file named `ecosystem.config.js`

   ```javascript
   module.exports = {
     apps: [
       {
         name: "mango-paradise",
         script: "build/index.js",
         instances: "max",
         exec_mode: "cluster",
         env: {
           NODE_ENV: "production",
         },
       },
     ],
   };
   ```

2. Start the application with PM2

   ```bash
   pm2 start ecosystem.config.js
   ```

3. Set PM2 to start on system boot
   ```bash
   pm2 startup
   pm2 save
   ```

## Step 5: Set Up Nginx as a Reverse Proxy

1. Install Nginx if not already installed

   ```bash
   sudo apt update
   sudo apt install nginx
   ```

2. Create an Nginx configuration file for your application

   ```bash
   sudo nano /etc/nginx/sites-available/mango-paradise
   ```

3. Add the following configuration (replace `yourdomain.com` with your domain)

   ```nginx
   server {
       listen 80;
       server_name yourdomain.com www.yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

4. Create a symbolic link to enable the site

   ```bash
   sudo ln -s /etc/nginx/sites-available/mango-paradise /etc/nginx/sites-enabled/
   ```

5. Test Nginx configuration and restart
   ```bash
   sudo nginx -t
   sudo systemctl restart nginx
   ```

## Step 6: Set Up SSL with Let's Encrypt

1. Install Certbot

   ```bash
   sudo apt install certbot python3-certbot-nginx
   ```

2. Obtain an SSL certificate

   ```bash
   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
   ```

3. Follow the prompts to complete the SSL setup

## Step 7: Set Up Stripe Webhook

1. Configure Stripe webhook to point to your production domain

   ```
   https://yourdomain.com/api/webhook
   ```

2. Update your `.env` file with the production Stripe webhook secret

## Step 8: Set Up Auth.js

1. Configure Auth.js for production by updating your `.env` file with the correct production URLs

   ```
   ORIGIN="https://yourdomain.com"
   ```

2. Make sure your OAuth providers (Google, Facebook) have the correct authorized redirect URIs
   ```
   https://yourdomain.com/auth/callback/google
   https://yourdomain.com/auth/callback/facebook
   ```

## Step 9: Monitoring and Maintenance

1. Set up application monitoring with PM2

   ```bash
   pm2 monitor
   ```

2. Set up automatic updates for security patches

   ```bash
   sudo apt update && sudo apt upgrade
   ```

3. Consider setting up a backup solution for your database and files
   ```bash
   # Example PostgreSQL backup script
   pg_dump -U mango_user mango_paradise > backup_$(date +%Y%m%d).sql
   ```

## Troubleshooting

- Check application logs

  ```bash
  pm2 logs
  ```

- Check Nginx logs

  ```bash
  sudo tail -f /var/log/nginx/error.log
  sudo tail -f /var/log/nginx/access.log
  ```

- Check system status
  ```bash
  sudo systemctl status nginx
  sudo systemctl status postgresql
  ```
