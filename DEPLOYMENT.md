# Deployment Guide

This project uses GitHub Actions to deploy the frontend to GitHub Pages and the backend to AWS EC2.

## Frontend Deployment (GitHub Pages)

The frontend is automatically deployed to GitHub Pages when changes are pushed to the `main` branch in the `client/` directory.

### Setup GitHub Pages

1. Go to your repository settings
2. Navigate to "Pages" section
3. Set source to "GitHub Actions"
4. The deployment will be handled automatically by the workflow

## Backend Deployment (AWS EC2)

The backend is deployed to an AWS EC2 instance when changes are pushed to the `main` branch in the `server/` or `api/` directories.

### Required GitHub Secrets

Add these secrets to your GitHub repository (Settings > Secrets and variables > Actions):

#### EC2 Connection Secrets
- `EC2_HOST`: Your EC2 instance public IP or domain name
- `EC2_USERNAME`: SSH username (usually `ubuntu` for Ubuntu instances)
- `EC2_SSH_KEY`: Your private SSH key for EC2 access
- `EC2_PORT`: SSH port (default: 22)

### EC2 Instance Setup

1. **Launch an EC2 instance** (Ubuntu 24.04 recommended)
2. **Configure security groups** to allow:
   - SSH (port 22) from your IP
   - HTTP (port 80) from anywhere
   - HTTPS (port 443) from anywhere
   - Custom port 3001 for your backend API

3. **Install Node.js** on the EC2 instance (Ubuntu 24.04):
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
   sudo apt-get install -y nodejs
   node --version  # Should show v22.x.x
   ```

4. **Create deployment directory**:
   ```bash
   mkdir -p /home/ubuntu/maizebus-backend
   ```

5. **Create environment file**:
   ```bash
   sudo nano /home/ubuntu/maizebus-backend/.env
   ```
   Add your environment variables:
   ```env
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_TO=contact@maizebus.com
   PORT=3001
   NODE_ENV=production
   FRONTEND_URL=https://mbusdev.github.io/maizebus-web
   ```

6. **Set up reverse proxy** (optional, for custom domain):
   ```bash
   sudo apt update
   sudo apt install nginx
   
   sudo nano /etc/nginx/sites-available/maizebus
   ```
   Add this configuration:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:3001;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
   Enable the site:
   ```bash
   sudo ln -s /etc/nginx/sites-available/maizebus /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

### Connectivity Configuration

**Frontend (GitHub Pages) → Backend (EC2)**
- Frontend URL: `https://mbusdev.github.io/maizebus-web`
- Backend URL: `https://your-ec2-domain.com` or `http://your-ec2-ip:3001`
- CORS is configured to allow GitHub Pages domain
- Backend binds to `0.0.0.0:3001` for external access

**Security Group Requirements:**
- Port 22 (SSH): Your IP only
- Port 80 (HTTP): 0.0.0.0/0 (for reverse proxy)
- Port 443 (HTTPS): 0.0.0.0/0 (for reverse proxy)
- Port 3001 (API): 0.0.0.0/0 (for direct API access)

**Testing Connectivity:**
```bash
# Test backend health endpoint
curl http://your-ec2-ip:3001/health

# Test API endpoint
curl -X POST http://your-ec2-ip:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","inquiryType":"general","subject":"Test","message":"Test"}'
```

### Deployment Process

The GitHub Actions workflow will:

1. **Build** the backend and API
2. **Create** a deployment package
3. **Upload** to EC2 via SSH
4. **Extract** and install dependencies
5. **Set up** systemd service
6. **Start** the backend service
7. **Clean up** old deployments

### Manual Deployment

To deploy manually:

```bash
# Build locally
npm run build:server
npm run build:api

# Create deployment package
tar -czf deployment.tar.gz -C server/dist . -C ../api/dist api

# Upload to EC2
scp -i your-key.pem deployment.tar.gz ubuntu@your-ec2-ip:/home/ubuntu/maizebus-backend/current/

# SSH into EC2 and extract
ssh -i your-key.pem ubuntu@your-ec2-ip
cd /home/ubuntu/maizebus-backend/current
tar -xzf deployment.tar.gz
npm ci --production
sudo systemctl restart maizebus-backend
```

### Monitoring

Check service status:
```bash
sudo systemctl status maizebus-backend
sudo journalctl -u maizebus-backend -f
```

### Troubleshooting

1. **Service won't start**: Check logs with `sudo journalctl -u maizebus-backend`
2. **Port not accessible**: Verify security group settings
3. **Environment variables**: Ensure `.env` file exists and has correct values
4. **Permissions**: Check file ownership with `ls -la /home/ubuntu/maizebus-backend/`

## Environment Variables

### Frontend
- `VITE_API_URL`: Backend API URL (set in GitHub Pages environment)

### Backend
- `EMAIL_HOST`: SMTP server hostname
- `EMAIL_PORT`: SMTP server port
- `EMAIL_USER`: SMTP username
- `EMAIL_PASS`: SMTP password/app password
- `EMAIL_TO`: Recipient email address
- `PORT`: Server port (default: 3001)
- `NODE_ENV`: Environment (production)
- `FRONTEND_URL`: Frontend URL for CORS