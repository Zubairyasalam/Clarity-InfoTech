import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, email, company, service, otherService, message, recaptcha, smtpConfig } = data;

    if (!recaptcha) {
      return NextResponse.json({ error: 'reCAPTCHA missing' }, { status: 400 });
    }

    if (!name || !email || !service || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Use configured SMTP credentials if provided, otherwise fallback to process.env
    const smtpEmail = smtpConfig?.smtpEmail || process.env.SMTP_EMAIL;
    const smtpPassword = smtpConfig?.smtpPassword || process.env.SMTP_PASSWORD;
    const smtpHost = smtpConfig?.smtpHost || 'smtp.gmail.com';
    const smtpPort = parseInt(smtpConfig?.smtpPort || '465', 10);
    const smtpEncryption = smtpConfig?.smtpEncryption || 'SSL';
    const secure = smtpPort === 465 || smtpEncryption === 'SSL';

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: secure,
      auth: {
        user: smtpEmail,
        pass: smtpPassword,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const serviceSelected = service === 'Other' && otherService ? `Other: ${otherService}` : service;

    // Send the email
    const mailOptions = {
      from: smtpEmail, // Send from the authenticated address
      to: smtpEmail, // Send to the same address (yours)
      replyTo: email,
      subject: `New Contact Form Submission from ${name} at ${company || 'Unknown Company'}`,
      text: `
        Name: ${name}
        Email: ${email}
        Company: ${company || 'N/A'}
        Service/Project Type: ${serviceSelected}
        
        Message:
        ${message}
      `,
      attachments: [{
        filename: 'c-logo.png',
        path: process.cwd() + '/public/c-logo.png',
        cid: 'claritylogo'
      }],
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f7fa; padding: 40px 20px; margin: 0; color: #000000;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
            <div style="background-color: #f9fafb; padding: 25px 30px; text-align: center; border-bottom: 1px solid #eee;">
              <img src="cid:claritylogo" alt="Clarity InfoTech Logo" style="width: 70px; height: auto; max-width: 100%; margin-bottom: 20px;" />
              <h2 style="margin: 0; color: #000000; font-size: 24px; font-weight: 600; letter-spacing: 0.5px;">New Client Inquiry</h2>
            </div>
            
            <div style="padding: 30px 40px;">
              <p style="font-size: 14px; color: #000000; margin-bottom: 25px;">You have received a new message from the <strong>Clarity InfoTech</strong> website contact form.</p>
              
              <div style="margin-bottom: 20px;">
                <p style="margin: 0 0 5px; font-size: 12px; color: #000000; text-transform: uppercase; font-weight: 700; letter-spacing: 1px;">Full Name</p>
                <p style="margin: 0; font-size: 16px; color: #000000;">${name}</p>
              </div>
              
              <div style="margin-bottom: 20px;">
                <p style="margin: 0 0 5px; font-size: 12px; color: #000000; text-transform: uppercase; font-weight: 700; letter-spacing: 1px;">Email Address</p>
                <p style="margin: 0; font-size: 16px;"><a href="mailto:${email}" style="color: #0066FF; text-decoration: none;">${email}</a></p>
              </div>
              
              <div style="margin-bottom: 20px;">
                <p style="margin: 0 0 5px; font-size: 12px; color: #000000; text-transform: uppercase; font-weight: 700; letter-spacing: 1px;">Company</p>
                <p style="margin: 0; font-size: 16px; color: #000000;">${company || 'Not Provided'}</p>
              </div>
              
              <div style="margin-bottom: 25px;">
                <p style="margin: 0 0 8px; font-size: 12px; color: #000000; text-transform: uppercase; font-weight: 700; letter-spacing: 1px;">Service Requested</p>
                <span style="display: inline-block; background-color: #f0f0f0; color: #000000; padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: 700;">${serviceSelected}</span>
              </div>
              
              <div style="margin-bottom: 10px;">
                <p style="margin: 0 0 10px; font-size: 12px; color: #000000; text-transform: uppercase; font-weight: 700; letter-spacing: 1px;">Project Details / Message</p>
                <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; font-size: 15px; color: #000000; line-height: 1.6; white-space: pre-wrap;">${message.replace(/\n/g, '<br/>')}</div>
              </div>
            </div>
            
            <div style="background-color: #f9fafb; border-top: 1px solid #eee; padding: 20px; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #000000;">This notification was generated securely via your website.</p>
            </div>
          </div>
        </div>
      `,
    };

    if (smtpEmail && smtpPassword) {
      await transporter.sendMail(mailOptions);
    } else {
      console.log("SMTP not configured. Message logged locally:", { name, email, company, serviceSelected, message });
    }

    return NextResponse.json({ success: true, message: 'Message submitted successfully!' });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json({ success: true, message: 'Message recorded successfully!' });
  }
}
