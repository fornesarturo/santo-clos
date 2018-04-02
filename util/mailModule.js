const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();

var mail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER, // generated ethereal user
        pass: process.env.MAIL_PASS // generated ethereal password
    }
});

function sendMail(destination, subject, body) {
    let mailOptions = {
        from: process.env.MAIL_USER,
        to: destination,
        subject: subject,
        html: body
    }
    mail.sendMail(mailOptions, (err, info) => {
        if (err) console.log(err);
        //else console.log(info);
    })
}

module.exports = 
    {
        sendMail: sendMail
    };