import express from 'express';
import cors from 'cors';
import multer from 'multer';
import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

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

    await transporter.sendMail(mailOptions);


    res.json({
      success: true,
      message: 'Application submitted successfully! We\'ll be in touch soon.'
    });

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

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: 'Message sent successfully! We\'ll get back to you soon.'
    });

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

app.listen(PORT, () => {
  console.log(`MaizeBus Backend server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});
