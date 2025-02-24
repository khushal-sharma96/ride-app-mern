require('dotenv').config();
const Bull = require('bull');
const nodemailer = require('nodemailer');
const emailQueue = new Bull('emailQueue', {
    redis: { host: 'localhost', port: 6379 }
});

emailQueue.process(async (job) => {
    const { to, subject, name } = job.data;

    // Load the HTML template
    // const htmlTemplate = await fs.promises.readFile(path.join(__dirname, 'template.html'), 'utf8');

    // // Replace placeholders in the template (like {{name}})
    // const htmlContent = htmlTemplate.replace('{{name}}', name);

    // Setup email data


    // Send the email
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: false, // use false for STARTTLS; true for SSL on port 465
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });
        //  const mailOptions = ;
        const res = await transporter.sendMail({
            from: process.env.MAIL_FROM,
            to: 'khushal.sharma@brucode.com',
            subject: "fjbgj",
            text: "vdfbdb"
        });
        console.log('Email sent:', res.response);
        return info;
    } catch (error) {
        console.error('Error occurred while sending email:', error);
        throw error;
    }
});

const sendMail = async (req, resp) => {
    // { from, to, subject, text }
    try {
        console.log(process.env.SENDER_EMAIL);
        res  = emailQueue.add({
            to: 'to',
            subject: 'subject',
            name: 'name',
          });
        resp.status(201).json({ status: true, data: res });
    }
    catch (err) {
        console.log(err);
        resp.status(500).json({ err });
    }
}
module.exports = sendMail;