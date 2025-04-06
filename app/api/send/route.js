import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Memory-based rate limiting (will reset on server restart)
const RATE_LIMIT = 5
const WINDOW_MS = 60 * 60 * 1000 // 1 hour
const ipRequestTracker = new Map()

// Create reusable transporter with environment variables
const createTransporter = () => {
  // Check if the required environment variables are set
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('Email environment variables are not set properly');
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false // Only in development - remove in production!
    }
  });
}

export async function POST(req) {
  try {
    // Get client IP for rate limiting
    const forwardedFor = req.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : 'unknown';
    
    // Apply rate limiting
    const now = Date.now();
    const requestData = ipRequestTracker.get(ip) || { count: 0, resetTime: now + WINDOW_MS };
    
    // Reset counter if window has passed
    if (now > requestData.resetTime) {
      requestData.count = 0;
      requestData.resetTime = now + WINDOW_MS;
    }
    
    // Check if rate limit exceeded
    if (requestData.count >= RATE_LIMIT) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Rate limit exceeded. Please try again later.`,
          details: {
            remainingTime: Math.ceil((requestData.resetTime - now) / 1000 / 60) + ' minutes'
          }
        },
        { status: 429 }
      );
    }
    
    // Increment count and save back to tracker
    requestData.count++;
    ipRequestTracker.set(ip, requestData);

    // Parse request body
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = createTransporter();
    if (!transporter) {
      return NextResponse.json(
        { success: false, error: 'Email service configuration error' },
        { status: 500 }
      );
    }

    // Prepare email options
    const mailOptions = {
      from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
      to: 'ecomorph10@gmail.com', // Your receiving email
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone || 'Not provided'}
        
        Message:
        ${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #333; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px;">New Contact Form Submission</h2>
          
          <div style="margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px;">
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <p style="color: #777; font-size: 12px; margin-top: 30px;">This email was sent from your portfolio website contact form.</p>
        </div>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Return success response
    return NextResponse.json(
      { 
        success: true, 
        message: 'Email sent successfully',
        requestsRemaining: RATE_LIMIT - requestData.count
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    
    // Format error message safely
    let errorMessage = 'An unexpected error occurred';
    if (error.code === 'EAUTH') {
      errorMessage = 'Authentication error with email provider';
    } else if (error.code === 'ESOCKET') {
      errorMessage = 'Network connection error';
    } else if (error.message) {
      errorMessage = error.message.split('\n')[0]; // Get first line of error
    }
    
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
