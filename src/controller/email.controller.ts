import { Request, Response } from 'express';
import setupSendGrid from '../configurations/sendgrid/sendgrid.config';

export const sendEmail = async (req: Request, res: Response) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const sgMail = setupSendGrid();

    const msg = {
      to: process.env.YOUR_EMAIL, // Your email address to receive messages
      from: process.env.SENDGRID_EMAIL as string, // Use your SendGrid verified sender email
      replyTo: email, // The user's email, so you can easily reply to them
      subject: `Portfolio Contact: ${subject} from ${name} (${email})`,
      html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Subject: ${subject}</p><p>Message: ${message}</p>`,
    };

    await sgMail.send(msg);

    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email.' });
  }
};