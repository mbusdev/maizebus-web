# SSL Certificate Setup with Let's Encrypt

This guide shows how to get a real SSL certificate from Let's Encrypt for your MaizeBus backend.

## 🔒 **Let's Encrypt Setup**

### **Option 1: Automatic Setup (Recommended)**

1. **Get a Domain Name**
   - Buy a domain (e.g., from Namecheap, GoDaddy, Cloudflare)
   - Point it to your EC2 instance IP: `ec2-3-129-13-199.us-east-2.compute.amazonaws.com`
   - Example: `api.maizebus.com` → `ec2-3-129-13-199.us-east-2.compute.amazonaws.com`

2. **Add GitHub Secret**
   - Go to GitHub repository → Settings → Secrets and variables → Actions
   - Add new secret: `DOMAIN_NAME` = `your-domain.com`
   - Example: `DOMAIN_NAME` = `api.maizebus.com`

3. **Redeploy**
   - Push any change to trigger deployment
   - Certbot will automatically get the certificate
   - Nginx will be configured for HTTPS

### **Option 2: Manual Setup**

If you prefer to set up Let's Encrypt manually:

```bash
# SSH into your EC2 instance
ssh -i your-key.pem ubuntu@ec2-3-129-13-199.us-east-2.compute.amazonaws.com

# Install certbot
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx

# Get certificate (replace with your domain)
sudo certbot --nginx -d your-domain.com --non-interactive --agree-tos --email your-email@example.com

# Test renewal
sudo certbot renew --dry-run
```

## 🌐 **Domain Setup Examples**

### **Cloudflare (Free)**
1. Sign up at cloudflare.com
2. Add your domain
3. Change nameservers to Cloudflare's
4. Add A record: `api` → `ec2-3-129-13-199.us-east-2.compute.amazonaws.com`

### **Namecheap**
1. Buy domain at namecheap.com
2. Go to Advanced DNS
3. Add A record: `api` → `ec2-3-129-13-199.us-east-2.compute.amazonaws.com`

### **GoDaddy**
1. Buy domain at godaddy.com
2. Go to DNS Management
3. Add A record: `api` → `ec2-3-129-13-199.us-east-2.compute.amazonaws.com`

## 🔧 **Update Frontend Configuration**

After getting your domain, update the frontend:

1. **Update config.ts**:
```typescript
export const API_BASE_URL = isDevelopment 
  ? 'http://localhost:3001'
  : apiUrl || 'https://your-domain.com';
```

2. **Add GitHub Secret**:
   - `EC2_API_URL` = `https://your-domain.com`

3. **Redeploy frontend**

## ✅ **Verification**

After setup, verify:

```bash
# Test HTTPS
curl https://your-domain.com/health

# Check certificate
openssl s_client -connect your-domain.com:443 -servername your-domain.com
```

## 🔄 **Certificate Renewal**

Let's Encrypt certificates expire every 90 days. The deployment includes automatic renewal:

```bash
# Check renewal status
sudo certbot certificates

# Test renewal
sudo certbot renew --dry-run

# Manual renewal
sudo certbot renew
```

## 🚨 **Troubleshooting**

### **Certificate Not Working**
- Check domain DNS propagation: `nslookup your-domain.com`
- Verify EC2 Security Group has port 443 open
- Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`

### **Domain Not Resolving**
- Wait for DNS propagation (up to 24 hours)
- Check DNS settings in your domain provider
- Use `dig your-domain.com` to verify

### **Certbot Fails**
- Ensure domain points to your EC2 IP
- Check that port 80 is open in Security Group
- Verify Nginx is running: `sudo systemctl status nginx`

## 📋 **Required GitHub Secrets**

Make sure you have these secrets configured:

```
EC2_HOST=ec2-3-129-13-199.us-east-2.compute.amazonaws.com
EC2_USERNAME=ubuntu
EC2_SSH_KEY=your-private-key
DOMAIN_NAME=your-domain.com
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_TO=contact@maizebus.com
EC2_API_URL=https://your-domain.com
```

## 🎯 **Benefits of Let's Encrypt**

- ✅ **Free SSL certificates**
- ✅ **Automatic renewal**
- ✅ **Trusted by all browsers**
- ✅ **No security warnings**
- ✅ **Professional appearance**
- ✅ **Better SEO ranking**

Your backend will be accessible at `https://your-domain.com` with a trusted SSL certificate!
