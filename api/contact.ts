import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

// Email configuration - only create transporter if credentials are provided
let transporter: nodemailer.Transporter | null = null;
const emailConfigured = process.env.EMAIL_USER && process.env.EMAIL_PASS;

if (emailConfigured) {
  transporter = nodemailer.createTransporter({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

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

    // Send email if configured, otherwise just log
    if (transporter) {
      await transporter.sendMail(mailOptions);
    } else {
      console.log('📧 Contact form received (email not configured):');
      console.log('Name:', name);
      console.log('Email:', email);
      console.log('Subject:', subject);
      console.log('Message:', message);
    }

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
}
