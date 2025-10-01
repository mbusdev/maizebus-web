# MaizeBus Backend

Backend server for MaizeBus web application handling form submissions and email notifications.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `env.example`:
```bash
cp env.example .env
```

3. Configure your email settings in `.env`:
   - For Gmail: Use your Gmail address and an App Password (not your regular password)
   - For other email providers: Update the SMTP settings accordingly

4. Start the development server:
```bash
npm run dev
```

The server will run on `http://localhost:3001`

## Environment Variables

- `EMAIL_HOST`: SMTP server host (default: smtp.gmail.com)
- `EMAIL_PORT`: SMTP server port (default: 587)
- `EMAIL_USER`: Your email address (use contact@maizebus.com to send from self)
- `EMAIL_PASS`: Your email password or app password
- `EMAIL_TO`: Recipient email address (default: contact@maizebus.com)
- `PORT`: Server port (default: 3001)
- `FRONTEND_URL`: Frontend URL for CORS (default: http://localhost:5173)

## API Endpoints

### POST /api/join
Handles form submissions with file uploads.

**Request:**
- Content-Type: multipart/form-data
- Fields: name, email, role, experience, motivation, portfolio, otherClubs, relevantClasses, problemSolving
- File: resume (optional, PDF or Word document, max 5MB)

**Response:**
```json
{
  "success": true,
  "message": "Application submitted successfully! We'll be in touch soon."
}
```

### POST /api/contact
Handles contact form submissions.

**Request:**
- Content-Type: application/json
- Fields: name, email, inquiryType, subject, message
- inquiryType: "general", "bug", or "feature"

**Response:**
```json
{
  "success": true,
  "message": "Message sent successfully! We'll get back to you soon."
}
```

### GET /health
Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "message": "MaizeBus Backend is running"
}
```

## Email Configuration

The server sends formatted emails to the configured recipient with:
- All form data in a clean HTML format
- Attached resume file (if provided)
- Subject line with applicant name and role

## File Upload

- Supported formats: PDF, DOC, DOCX
- Maximum file size: 5MB
- Files are temporarily stored and deleted after email sending
# Test trigger
# Trigger backend deployment - Wed Oct  1 02:27:18 EDT 2025
# Check backend status - Wed Oct  1 03:07:33 EDT 2025
