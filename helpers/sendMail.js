
const nodemailer = require('nodemailer');
const sendEmail = async (res, message) => {
    var transport = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.PORT,
        auth: {
            user: process.env.USER,
            pass: process.env.PASSWORD
        }
    });
}

module.exports = {
    sendMail
}