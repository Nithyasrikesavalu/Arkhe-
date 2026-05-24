import fs from 'fs/promises';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import Inquiry from '../models/Inquiry.js';

/* Helper to send email notifications */
const sendInquiryEmail = async (data) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.example.com',
    port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER || 'user@example.com',
      pass: process.env.SMTP_PASS || 'password',
    },
  });

  const mailOptions = {
    from: process.env.SMTP_FROM || 'no-reply@arkheestates.com',
    to: 'botvortex.learning@gmail.com',
    subject: `New Inquiry from ${data.name}`,
    text: `You have received a new inquiry:\n\nName: ${data.name}\nEmail: ${data.email}\nMobile: ${data.mobile}\nProject Type: ${data.projectType}\nMessage: ${data.message}\nTarget Project: ${data.targetProject || 'N/A'}`,
  };

    try {
    await transporter.sendMail(mailOptions);
  } catch (emailErr) {
    console.error('Failed to send inquiry email:', emailErr);
  }
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createInquiry = async (req, res, next) => {
  try {
    const { name, email, mobile, projectType, message, targetProject } = req.body;

    if (!name || !email || !mobile || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all required fields (name, email, mobile, message).',
      });
    }

    const validTypes = ['Villa', 'Commercial', 'Smart Home', 'Interior', 'Renovation', 'Architecture', 'General Inquiry'];
    let matchedType = 'General Inquiry';
    if (projectType) {
      const found = validTypes.find(t => t.toLowerCase() === projectType.toLowerCase());
      if (found) {
        matchedType = found;
      }
    }

    const isValidObjectId = targetProject && mongoose.Types.ObjectId.isValid(targetProject);
    const inquiryData = {
      name,
      email,
      mobile,
      projectType: matchedType,
      message,
      targetProject: isValidObjectId ? targetProject : null,
      createdAt: new Date(),
    };

    // If MongoDB is not connected, save to a local inquiries.json file
    if (!global.isMongoConnected) {
      const filePath = path.join(__dirname, '../inquiries.json');
      let inquiries = [];

      try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        inquiries = JSON.parse(fileContent);
      } catch (err) {
        // File does not exist, start with empty array
      }

      inquiries.push({
        _id: `offline_inquiry_${Date.now()}`,
        ...inquiryData,
      });

      await fs.writeFile(filePath, JSON.stringify(inquiries, null, 2), 'utf-8');
      console.log(`\x1b[33m[Inquiry] Saved offline inquiry from ${name} to inquiries.json\x1b[0m`);

      await sendInquiryEmail(inquiryData);
      return res.status(201).json({
        success: true,
        message: 'Inquiry saved successfully (offline storage backup).',
        inquiry: inquiryData,
        fallbackMode: true,
      });
    }

    // Standard MongoDB path
    const newInquiry = await Inquiry.create(inquiryData);
    await sendInquiryEmail(inquiryData);

    res.status(201).json({
      success: true,
      message: 'Inquiry saved successfully.',
      inquiry: newInquiry,
      fallbackMode: false,
    });
  } catch (error) {
    next(error);
  }
};
