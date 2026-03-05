import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    console.log('--- Incoming Contact Form Request ---');

    // Only allow POST
    if (req.method !== 'POST') {
        console.log('Method not allowed:', req.method);
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, message } = req.body;
    console.log(`Payload from ${name} (${email})`);

    if (!name || !email || !message) {
        console.log('Validation failed: Missing fields');
        return res.status(400).json({ error: 'All fields are required' });
    }

    // AUTH CHECK
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
        console.error('SERVER ERROR: Missing Environment Variables GMAIL_USER or GMAIL_APP_PASSWORD');
        return res.status(500).json({ error: 'Server configuration error. Please check environment variables.' });
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD,
        },
    });

    try {
        console.log('Attempting to send mail via Gmail...');
        const info = await transporter.sendMail({
            from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
            to: process.env.GMAIL_USER,
            replyTo: email,
            subject: `Portfolio Message from ${name}`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7c4dff;">Portfolio Message</h2>
          <hr style="border: 1px solid #eee;" />
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 8px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <hr style="border: 1px solid #eee; margin-top: 30px;" />
          <p style="color: #999; font-size: 12px;">Sent from portfolio.vishalgupta.xyz</p>
        </div>
      `,
        });

        console.log('Message sent successfully:', info.messageId);
        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('NODEMAILER ERROR:', error.message);
        console.error('STACK:', error.stack);

        // Provide more detail in the 500 response temporarily to help the user debug
        return res.status(500).json({
            error: 'Failed to send email',
            details: error.message,
            tip: 'Check if GMAIL_APP_PASSWORD is correct and has no spaces. It must be 16 characters.'
        });
    }
}
