# MaizeBus Backend API

> Node.js/Express backend server for MaizeBus - University of Michigan's student-run bus tracking application

[![Node.js](https://img.shields.io/badge/Node.js-18.0.0-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18.0-black.svg)](https://expressjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue.svg)](https://www.typescriptlang.org/)
[![Nodemailer](https://img.shields.io/badge/Nodemailer-6.9.0-red.svg)](https://nodemailer.com/)

## 🚀 Live API

- **Production**: [https://api.maizebus.com](https://api.maizebus.com)
- **Health Check**: [https://api.maizebus.com/health](https://api.maizebus.com/health)
- **EC2 Fallback**: [https://ec2-3-129-13-199.us-east-2.compute.amazonaws.com](https://ec2-3-129-13-199.us-east-2.compute.amazonaws.com)

## 📋 Features

- **RESTful API**: Clean, well-documented endpoints
- **Form Processing**: Handle contact and application submissions
- **Email Integration**: Automated email notifications with Nodemailer
- **File Upload**: Resume upload support with validation
- **CORS Support**: Configured for frontend integration
- **Type Safety**: Full TypeScript implementation
- **Error Handling**: Comprehensive error management
- **Health Monitoring**: Built-in health check endpoint
- **SSL Support**: HTTPS with Let's Encrypt certificates
- **Auto Deployment**: GitHub Actions to AWS EC2

## 🛠️ Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **Email**: Nodemailer with SMTP
- **File Upload**: Multer
- **CORS**: Express CORS middleware
- **Deployment**: AWS EC2 with Nginx reverse proxy
- **SSL**: Let's Encrypt with Certbot

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm 8+
- SMTP email account (Gmail recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/mbusdev/maizebus-web.git
cd maizebus-web/server

# Install dependencies
npm install

# Copy environment template
cp example.env .env

# Configure your environment variables
nano .env

# Start development server
npm run dev
```

The server will be available at `http://localhost:3001`

## 📁 Project Structure

```
server/
├── src/
│   └── server.ts          # Main server file
├── uploads/               # Temporary file storage
├── dist/                  # Compiled JavaScript (production)
├── example.env           # Environment variables template
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md            # This file
```

## ⚙️ Environment Configuration

Create a `.env` file in the server directory:

```bash
# Server Configuration
PORT=3001
NODE_ENV=production

# Frontend URL (for CORS)
FRONTEND_URL=https://www.maizebus.com

# Custom Domain (for SSL certificates)
DOMAIN_NAME=api.maizebus.com

# Email Configuration (Gmail example)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=contact@maizebus.com
EMAIL_PASS=your-app-password
EMAIL_TO=contact@maizebus.com
```

### Email Setup

#### Gmail Configuration
1. Enable 2-Factor Authentication
2. Generate an App Password: [Google Account Settings](https://myaccount.google.com/apppasswords)
3. Use the App Password (not your regular password) in `EMAIL_PASS`

#### Other Email Providers
```bash
# Outlook/Hotmail
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587

# Yahoo
EMAIL_HOST=smtp.mail.yahoo.com
EMAIL_PORT=587

# Custom SMTP
EMAIL_HOST=your-smtp-server.com
EMAIL_PORT=587
```

## 🎯 Available Scripts

```bash
# Development
npm run dev              # Start with nodemon (auto-restart)
npm run build            # Compile TypeScript to JavaScript
npm start                # Start production server
npm run type-check       # Check TypeScript types

# Testing
npm test                 # Run tests (if available)
```

## 📡 API Endpoints

### Health Check

#### `GET /health`
Check if the server is running.

**Response:**
```json
{
  "status": "OK",
  "message": "MaizeBus Backend is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Contact Form

#### `POST /api/contact`
Handle contact form submissions.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@umich.edu",
  "inquiryType": "general",
  "subject": "Question about MaizeBus",
  "message": "I have a question about..."
}
```

**Inquiry Types:**
- `general` - General inquiries
- `bug` - Bug reports
- `feature` - Feature requests

**Response:**
```json
{
  "success": true,
  "message": "Message sent successfully! We'll get back to you soon."
}
```

### Application Form

#### `POST /api/join`
Handle membership application submissions.

**Request:**
```json
{
  "name": "Jane Smith",
  "email": "jane@umich.edu",
  "role": "Software Engineer",
  "experience": "2 years React, 1 year Node.js",
  "motivation": "I want to help improve campus transportation...",
  "portfolio": "https://janesmith.dev",
  "otherClubs": "Computer Science Club",
  "relevantClasses": "EECS 281, EECS 485",
  "problemSolving": "I approach problems by..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Application submitted successfully! We'll be in touch soon."
}
```

## 🔧 CORS Configuration

The server is configured to accept requests from:

- `http://localhost:5173` (Development frontend)
- `https://www.maizebus.com` (Production frontend)
- `https://maizebus.com` (Production frontend root)
- `https://mbusdev.github.io` (GitHub Pages)
- `https://api.maizebus.com` (Self-referencing)
- `https://ec2-3-129-13-199.us-east-2.compute.amazonaws.com` (EC2 fallback)

## 📧 Email Features

### Contact Form Emails
- **Subject**: `[MaizeBus Contact] {inquiryType}: {subject}`
- **Content**: Formatted HTML with all form data
- **Recipient**: Configured in `EMAIL_TO`

### Application Emails
- **Subject**: `[MaizeBus Application] {name} - {role}`
- **Content**: Formatted HTML with application details
- **Recipient**: Configured in `EMAIL_TO`

### Email Template
```html
<h2>New {formType} Submission</h2>
<p><strong>Name:</strong> {name}</p>
<p><strong>Email:</strong> {email}</p>
<!-- Additional fields based on form type -->
<p><strong>Message:</strong></p>
<p>{message}</p>
```

## 🚀 Deployment

### AWS EC2 Deployment

The server is automatically deployed to AWS EC2 via GitHub Actions:

1. **Trigger**: Push to `main` branch
2. **Process**: 
   - SSH into EC2 instance
   - Install Node.js and dependencies
   - Build TypeScript code
   - Configure systemd service
   - Set up Nginx reverse proxy
   - Configure SSL certificates (Let's Encrypt)
3. **Result**: Production server running on port 3001

### Manual Deployment

```bash
# Build the project
npm run build

# Upload to your server
scp -r dist/ user@your-server:/path/to/maizebus-backend/

# Install production dependencies
npm install --production

# Start the server
npm start
```

### SSL Certificate Setup

The deployment automatically handles SSL certificates:

1. **Let's Encrypt**: Attempts to get real SSL certificate
2. **Fallback**: Generates self-signed certificate if Let's Encrypt fails
3. **Nginx**: Configures reverse proxy with HTTPS

## 🔒 Security Features

- **CORS Protection**: Configured allowed origins
- **File Upload Validation**: Type and size restrictions
- **Input Sanitization**: Basic validation on form inputs
- **HTTPS Only**: Production forces HTTPS
- **Environment Variables**: Sensitive data in environment
- **Error Handling**: No sensitive data in error responses

## 📊 Monitoring

### Health Check
Monitor server status with the `/health` endpoint:

```bash
# Check server status
curl https://api.maizebus.com/health

# Check from EC2
curl https://ec2-3-129-13-199.us-east-2.compute.amazonaws.com/health
```

### Logs
- **Systemd Logs**: `sudo journalctl -u maizebus-backend -f`
- **Nginx Logs**: `/var/log/nginx/access.log` and `/var/log/nginx/error.log`
- **Application Logs**: Check console output in systemd service

## 🐛 Troubleshooting

### Common Issues

**Server not starting**
```bash
# Check if port is in use
sudo lsof -i :3001

# Check systemd service status
sudo systemctl status maizebus-backend

# View service logs
sudo journalctl -u maizebus-backend -f
```

**Email not sending**
- Verify SMTP credentials in `.env`
- Check if App Password is correct (Gmail)
- Ensure firewall allows SMTP port (587)

**CORS errors**
- Verify frontend URL is in `allowedOrigins` array
- Check if `FRONTEND_URL` environment variable is set

**SSL certificate issues**
- Check if domain DNS is pointing to EC2
- Verify Let's Encrypt certificate: `sudo certbot certificates`
- Check Nginx configuration: `sudo nginx -t`

**File upload issues**
- Check `uploads/` directory permissions
- Verify file size limits (5MB max)
- Ensure supported file types (PDF, DOC, DOCX)

### Debug Mode

Enable debug logging by setting:
```bash
NODE_ENV=development
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly
5. Commit: `git commit -m 'Add amazing feature'`
6. Push: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

Built by the MaizeBus development team at the University of Michigan.

- **Backend Lead**: Ryan Lu
- **DevOps Lead**: Andrew Yu
- **Executive Director**: Ishan Kumar

## 📞 Support

- **Email**: contact@maizebus.com
- **GitHub Issues**: [Report bugs or request features](https://github.com/mbusdev/maizebus-web/issues)
- **API Documentation**: [View API docs](https://api.maizebus.com/health)

---

**Made with ❤️ by Michigan students, for Michigan students**