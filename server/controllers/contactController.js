import nodemailer from 'nodemailer';
import Contact from '../models/Contact.js';

/**
 * Helper to send email notification using Nodemailer.
 * Configured to use Gmail SMTP by default, with fallbacks for customizable SMTP settings.
 */
const sendContactEmail = async (contactData) => {
  // Check if credentials are provided
  const emailUser = process.env.EMAIL_USER;
  // Strip any spaces from the App Password if present (often formatted with spaces for readability)
  const emailPass = process.env.EMAIL_PASS ? process.env.EMAIL_PASS.replace(/\s+/g, '') : '';

  if (!emailUser || !emailPass) {
    console.warn('\x1b[33m[Mailer] WARNING: EMAIL_USER and EMAIL_PASS environment variables are not set. Skipping email sending.\x1b[0m');
    return false;
  }

  console.log(`\x1b[36m[Mailer] Configuring mail transporter for: ${emailUser}\x1b[0m`);

  // Configure transporter (using Gmail service, or generic SMTP host if provided)
  const transporterConfig = process.env.SMTP_HOST 
    ? {
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
        auth: {
          user: emailUser,
          pass: emailPass,
        },
      }
    : {
        service: 'gmail',
        auth: {
          user: emailUser,
          pass: emailPass,
        },
      };

  const transporter = nodemailer.createTransport(transporterConfig);

  // Format the submission date/time nicely
  const submittedTime = new Date(contactData.createdAt || Date.now()).toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata', // Localize time to the user's timezone if desired, or default UTC
    dateStyle: 'full',
    timeStyle: 'long',
  });

  const mailOptions = {
    from: `"ARKHE Luxury Real Estate" <${emailUser}>`,
    to: 'botvortex.learning@gmail.com', // Recipient specified by user
    replyTo: contactData.email,
    subject: `📩 New Consultation Request: ${contactData.subject} - from ${contactData.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
        <div style="background: linear-gradient(135deg, #7C4DFF 0%, #9E7CFF 100%); padding: 24px; text-align: center; color: white;">
          <h2 style="margin: 0; font-size: 24px; letter-spacing: 2px;">ARKHE ESTATES</h2>
          <p style="margin: 4px 0 0 0; font-size: 14px; opacity: 0.9;">New Consultation Submission</p>
        </div>
        <div style="padding: 24px; background-color: #ffffff;">
          <h3 style="color: #7C4DFF; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; margin-top: 0;">Inquiry Details</h3>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 120px; color: #475569;">Name:</td>
              <td style="padding: 8px 0; color: #0f172a;">${contactData.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #475569;">Email:</td>
              <td style="padding: 8px 0; color: #0f172a;"><a href="mailto:${contactData.email}" style="color: #7C4DFF; text-decoration: none;">${contactData.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #475569;">Phone:</td>
              <td style="padding: 8px 0; color: #0f172a;"><a href="tel:${contactData.phone}" style="color: #7C4DFF; text-decoration: none;">${contactData.phone}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #475569;">Subject:</td>
              <td style="padding: 8px 0; color: #0f172a;">${contactData.subject}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #475569;">Submitted At:</td>
              <td style="padding: 8px 0; color: #64748b; font-size: 13px;">${submittedTime}</td>
            </tr>
          </table>

          <h3 style="color: #7C4DFF; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; margin-top: 24px;">Message Details</h3>
          <div style="background-color: #f8fafc; border-left: 4px solid #7C4DFF; padding: 16px; border-radius: 4px; color: #334155; font-style: italic; white-space: pre-wrap;">
            ${contactData.message}
          </div>
        </div>
        <div style="background-color: #f1f5f9; padding: 16px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
          This is an automated notification from the ARKHE Luxury Real Estate CRM system.
        </div>
      </div>
    `,
    text: `
      ARKHE LUXURY REAL ESTATE - NEW CONSULTATION SUBMISSION
      
      INQUIRY DETAILS
      -------------------------
      Name: ${contactData.name}
      Email: ${contactData.email}
      Phone: ${contactData.phone}
      Subject: ${contactData.subject}
      Submitted At: ${submittedTime}
      
      MESSAGE
      -------------------------
      ${contactData.message}
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`\x1b[32m[Mailer] Email sent successfully: ${info.messageId}\x1b[0m`);
    return true;
  } catch (error) {
    console.error(`\x1b[31m[Mailer] Failed to send email via SMTP:\x1b[0m`, error);
    return false;
  }
};

/**
 * Handle new contact form submissions.
 * POST /api/contacts
 */
export const submitContactForm = async (req, res) => {
  console.log('\x1b[34m[Contact API] Received contact form submission payload:\x1b[0m', req.body);

  const { name, email, phone, subject, message } = req.body;

  // 1. Backend Validation
  if (!name || !email || !phone || !subject || !message) {
    console.warn('\x1b[33m[Contact API] Submission failed: Missing required fields\x1b[0m');
    return res.status(400).json({
      success: false,
      message: 'All fields (Name, Email, Phone, Subject, and Message) are required.',
    });
  }

  // Simple Email Regex Validation
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email)) {
    console.warn('\x1b[33m[Contact API] Submission failed: Invalid email format\x1b[0m', email);
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address.',
    });
  }

  try {
    let savedContact;

    // 2. Check Database Connection & Persist
    if (global.isMongoConnected) {
      console.log('\x1b[36m[Contact API] Storing contact submission in MongoDB...\x1b[0m');
      savedContact = await Contact.create({
        name,
        email,
        phone,
        subject,
        message,
      });
      console.log('\x1b[32m[Contact API] Saved to MongoDB successfully:\x1b[0m', savedContact._id);
    } else {
      console.warn('\x1b[33m[Contact API] MongoDB not connected! Storing contact locally in memory/fallback mode.\x1b[0m');
      // Create temporary mock object for local/in-memory handling
      savedContact = {
        _id: `fallback_${Date.now()}`,
        name,
        email,
        phone,
        subject,
        message,
        createdAt: new Date(),
      };
    }

    // 3. Send Email Notification
    console.log('\x1b[36m[Contact API] Initiating email notification task...\x1b[0m');
    const emailSent = await sendContactEmail(savedContact);

    // 4. Return Success Response
    return res.status(201).json({
      success: true,
      message: emailSent
        ? 'Your inquiry has been submitted and the email notification was sent successfully!'
        : 'Inquiry saved successfully, but email notification failed to send.',
      data: savedContact,
      emailSent,
      fallbackMode: !global.isMongoConnected,
    });

  } catch (error) {
    console.error('\x1b[31m[Contact API] Unexpected error handling contact submission:\x1b[0m', error);
    
    // Mongoose Validation Error details
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Internal server error occurred while processing your request.',
      error: error.message,
    });
  }
};
