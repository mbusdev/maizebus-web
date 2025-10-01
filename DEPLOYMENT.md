# MaizeBus Web Deployment Guide

This guide covers deploying the MaizeBus web application to Vercel using GitHub Actions.

## 🚀 Quick Deploy to Vercel

### 1. GitHub Repository Setup
1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will automatically detect the configuration

### 2. Environment Variables
Set these environment variables in your Vercel project settings:

```bash
# Email Configuration (Optional - for production email)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_TO=contact@maizebus.com

# Server Configuration
NODE_ENV=production
```

### 3. GitHub Secrets (for GitHub Actions)
If using GitHub Actions, add these secrets to your repository:

```bash
VERCEL_TOKEN=your-vercel-token
VERCEL_ORG_ID=your-org-id
VERCEL_PROJECT_ID=your-project-id
```

## 📁 Project Structure

```
maizebus-web/
├── client/              # React frontend
├── server/              # Node.js backend (for local dev)
├── api/                 # Vercel serverless functions
│   ├── join.ts         # Join form API
│   ├── contact.ts      # Contact form API
│   └── health.ts       # Health check API
├── vercel.json         # Vercel configuration
└── .github/workflows/  # GitHub Actions
```

## 🔧 Configuration Files

### Vercel Configuration (`vercel.json`)
- Routes API calls to serverless functions
- Serves static client files
- Handles CORS and routing

### API Functions (`/api/`)
- `join.ts` - Handles join form submissions
- `contact.ts` - Handles contact form submissions  
- `health.ts` - Health check endpoint

### Client Configuration (`client/src/config.ts`)
- Automatically detects development vs production
- Uses localhost:3001 for development
- Uses same origin for production

## 🛠️ Development vs Production

### Development
```bash
npm run dev
```
- Client: http://localhost:5173
- Server: http://localhost:3001
- API calls go to local server

### Production (Vercel)
- Client: https://your-domain.vercel.app
- API: https://your-domain.vercel.app/api/*
- API calls go to serverless functions

## 📧 Email Configuration

### Development
- Email is logged to console
- No email configuration needed

### Production
- Set up email environment variables
- Uses Nodemailer with Gmail SMTP
- Falls back to console logging if not configured

## 🚀 Deployment Process

1. **Push to GitHub**: Code is automatically deployed
2. **Vercel Build**: Builds client and deploys serverless functions
3. **Environment**: Production environment variables are loaded
4. **Domain**: Vercel provides a custom domain

## 🔍 Troubleshooting

### Common Issues

1. **API calls failing in production**
   - Check that API routes are in `/api/` directory
   - Verify CORS headers are set correctly

2. **Email not working**
   - Verify environment variables are set
   - Check Gmail app password is correct
   - Check Vercel function logs

3. **Build failures**
   - Check TypeScript compilation
   - Verify all dependencies are installed
   - Check Vercel build logs

### Debug Commands

```bash
# Local development
npm run dev

# Build locally
npm run build

# Test production build locally
npm run start
```

## 📊 Monitoring

- **Vercel Dashboard**: Monitor deployments and performance
- **Function Logs**: Check serverless function execution
- **Analytics**: Built-in Vercel analytics for client performance

## 🔒 Security

- Environment variables are encrypted in Vercel
- CORS is properly configured
- API routes are protected by Vercel's security features
- No sensitive data in client-side code
