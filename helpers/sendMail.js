import { createTransport } from 'nodemailer';
const sendEmail = async ({ email, subject, messageStr }) => {
    var transporter = createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.PASSWORD
        }
    });
    const message = {
        from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
        to: email,
        subject: subject,
        text: messageStr
    }

    await transporter.sendMail(message);
}

export default sendEmail;