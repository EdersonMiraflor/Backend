import { Request, Response } from 'express';
import createTransport from '../configurations/gmail/gmail.config';

export const sendEmail = async (req: Request, res: Response) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const transporter = createTransport();

    await transporter.sendMail({
      from: process.env.GMAIL_USER, // The authenticated sender (your Gmail)
      to: process.env.YOUR_EMAIL, // Your email address to receive messages
      replyTo: email, // The user's email, so you can easily reply to them
      subject: `Portfolio Contact: ${subject} from ${name} (${email})`,
      html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Subject: ${subject}</p><p>Message: ${message}</p>`,
    });

    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email.' });
  }
};