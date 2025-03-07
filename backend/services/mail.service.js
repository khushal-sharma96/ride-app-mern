require('dotenv').config();
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false, // use false for STARTTLS; true for SSL on port 465
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});
module.exports = async ({ email, subject, text, firstname, verifyLink,token }) => {
    const htmlContent = `
        <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 20px;">
        <div style="max-width: 100vw; margin: auto; background-color: #fff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); padding: 20px;">
            <div style="background-color: #ffeb3b; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
                <h1 style="margin: 0; color: #333;">Welcome to Our App!</h1>
            </div>
            <div style="margin: 20px 0; color: #555;">
                <p>Hi <bold>${firstname}</bold>,</p>
                <p>We are grateful to have you as a part of our ride family. Please verify your account first to move forward by clicking the below button.</p>
                <p style="text-align:center;">
                    <a href="${process.env.APP_URL}/user/verify/${token}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px;">Verify Email</a>
                </p>
            </div>
            <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #aaa;">
                <p>If you did not create an account, no further action is required.</p>
                <p>Thank you for joining us!</p>
            </div>
        </div>
    </div>
    `;

    await transporter.sendMail({
        from: process.env.MAIL_FROM,
        to: email ?? "",
        subject: subject ?? 'Welcome!',
        text: text ?? "",
        html: htmlContent
    });
};
// async (emailOptions) => {
//     console.log(emailOptions);
//     return await transporter.sendMail(emailOptions);
// };
// const emailQueue = new Bull('emailQueue', {
//     redis: { host: 'localhost', port: 6379 }
// });

// emailQueue.process(async (job) => {
//     const { to, subject, name } = job.data;

//     // Load the HTML template
//     // const htmlTemplate = await fs.promises.readFile(path.join(__dirname, 'template.html'), 'utf8');

//     // // Replace placeholders in the template (like {{name}})
//     // const htmlContent = htmlTemplate.replace('{{name}}', name);

//     // Setup email data


//     // Send the email
//     try {
//
//         //  const mailOptions = ;
//         const res = await transporter.sendMail({
//             from: process.env.MAIL_FROM,
//             to: 'khushal.sharma@brucode.com',
//             subject: "fjbgj",
//             text: "vdfbdb"
//         });
//         console.log('Email sent:', res.response);
//         return info;
//     } catch (error) {
//         console.error('Error occurred while sending email:', error);
//         throw error;
//     }
// });