import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

// Email configuration - only create transporter if credentials are provided
let transporter: nodemailer.Transporter | null = null;
const emailConfigured = process.env.EMAIL_USER && process.env.EMAIL_PASS;

if (emailConfigured) {
  transporter = nodemailer.createTransport({
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

    // Send email if configured, otherwise just log
    if (transporter) {
      await transporter.sendMail(mailOptions);
    } else {
      console.log('📧 Application received (email not configured):');
      console.log('Name:', formData.name);
      console.log('Email:', formData.email);
      console.log('Role:', formData.role);
      console.log('Experience:', formData.experience);
      console.log('Motivation:', formData.motivation);
    }

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
}
