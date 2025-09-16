import sgMail from "@sendgrid/mail";

const setupSendGrid = () => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
  return sgMail;
};

export default setupSendGrid;
