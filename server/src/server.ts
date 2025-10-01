import express from 'express';
import cors from 'cors';
import multer from 'multer';
import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || '3001');

// CORS configuration for production and development
const allowedOrigins = [
  'http://localhost:5173', // Development
  'http://localhost:3000', // Alternative dev port
  process.env.FRONTEND_URL, // Production frontend URL
  'https://mbusdev.github.io', // GitHub Pages
  'https://mbusdev.github.io/maizebus-web' // GitHub Pages with path
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from client build
const clientBuildPath = path.join(__dirname, '../../client/dist');
if (fs.existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and Word documents are allowed'));
    }
  }
});

// Email configuration - only create transporter if credentials are provided
let transporter: nodemailer.Transporter | null = null;
const emailConfigured = process.env.EMAIL_USER && process.env.EMAIL_PASS;

if (emailConfigured) {
  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_PORT === '465',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
} else {
  console.log('⚠️  Email not configured - forms will be logged to console only');
  console.log('   To enable email, set EMAIL_USER and EMAIL_PASS environment variables');
}

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'MaizeBus Backend is running' });
});

app.post('/api/join', async (req, res) => {
  try {
    const formData = req.body;

    const requiredFields = ['name', 'email', 'role', 'experience', 'motivation'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    const emailContent = `
      <h2>New MaizeBus Application</h2>
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h3>Personal Information</h3>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Preferred Role:</strong> ${formData.role}</p>
        
        <h3>Application Details</h3>
        <p><strong>Experience & Skills:</strong></p>
        <p style="background: #f5f5f5; padding: 10px; border-radius: 5px; white-space: pre-wrap;">${formData.experience}</p>
        
        <p><strong>Why MaizeBus:</strong></p>
        <p style="background: #f5f5f5; padding: 10px; border-radius: 5px; white-space: pre-wrap;">${formData.motivation}</p>
        
        ${formData.portfolio ? `<p><strong>Portfolio/GitHub:</strong> <a href="${formData.portfolio}">${formData.portfolio}</a></p>` : ''}
        ${formData.otherClubs ? `<p><strong>Other Clubs:</strong> ${formData.otherClubs}</p>` : ''}
        ${formData.relevantClasses ? `<p><strong>Relevant Classes:</strong> ${formData.relevantClasses}</p>` : ''}
        ${formData.problemSolving ? `<p><strong>Problem Solving:</strong> ${formData.problemSolving}</p>` : ''}
        
      </div>
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || 'contact@maizebus.com',
      subject: `New MaizeBus Application - ${formData.name} (${formData.role})`,
      html: emailContent,
      attachments: []
    };

    if (transporter) {
      await transporter.sendMail(mailOptions);
      res.json({
        success: true,
        message: 'Application submitted successfully! We\'ll be in touch soon.'
      });
    } else {
      console.log('📧 Application received (email not configured):');
      console.log('Name:', formData.name);
      console.log('Email:', formData.email);
      console.log('Role:', formData.role);
      console.log('Experience:', formData.experience);
      console.log('Motivation:', formData.motivation);
      res.json({
        success: true,
        message: 'Application received (email not configured).'
      });
    }

  } catch (error) {
    console.error('Error processing application:', error);
    

    res.status(500).json({
      success: false,
      message: 'Failed to submit application. Please try again later.'
    });
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, inquiryType, subject, message } = req.body;

    const requiredFields = ['name', 'email', 'inquiryType', 'subject', 'message'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    const inquiryTypeLabels = {
      general: 'General Inquiry',
      bug: 'Bug Report',
      feature: 'Feature Request'
    };

    const inquiryTypeLabel = inquiryTypeLabels[inquiryType as keyof typeof inquiryTypeLabels] || inquiryType;

    const emailContent = `
      <h2>New Contact Form Submission</h2>
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h3>Contact Information</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Inquiry Type:</strong> ${inquiryTypeLabel}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        
        <h3>Message</h3>
        <p style="background: #f5f5f5; padding: 15px; border-radius: 8px; white-space: pre-wrap; border-left: 4px solid #FFCB05;">${message}</p>
        
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #e2e8f0;">
        <p style="font-size: 0.875rem; color: #64748b;">
          This message was sent through the MaizeBus contact form on ${new Date().toLocaleString()}.
        </p>
      </div>
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || 'contact@maizebus.com',
      subject: `Contact Form: ${subject} - ${name}`,
      html: emailContent,
    };

    if (transporter) {
      await transporter.sendMail(mailOptions);
      res.json({
        success: true,
        message: 'Message sent successfully! We\'ll get back to you soon.'
      });
    } else {
      console.log('📧 Contact form received (email not configured):');
      console.log('Name:', name);
      console.log('Email:', email);
      console.log('Subject:', subject);
      console.log('Message:', message);
      res.json({
        success: true,
        message: 'Message received (email not configured).'
      });
    }

  } catch (error) {
    console.error('Error processing contact form:', error);
    
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.'
    });
  }
});

app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File size too large. Maximum size is 5MB.'
      });
    }
  }
  
  if (error.message === 'Only PDF and Word documents are allowed') {
    return res.status(400).json({
      success: false,
      message: 'Only PDF and Word documents are allowed.'
    });
  }

  console.error('Unhandled error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// Catch-all handler: send back React's index.html file for client-side routing
app.use((req, res) => {
  // Skip API routes
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ message: 'API endpoint not found' });
  }
  
  const indexPath = path.join(__dirname, '../../client/dist/index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).json({ message: 'Frontend not built. Please run npm run build:client' });
  }
});

export default app;

const HOST = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';

app.listen(PORT, HOST, () => {
  console.log(`MaizeBus Backend server running on ${HOST}:${PORT}`);
  console.log(`Health check: http://${HOST}:${PORT}/health`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`CORS allowed origins: ${allowedOrigins.join(', ')}`);
});
