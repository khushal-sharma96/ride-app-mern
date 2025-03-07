const Queue = require("bull");
const emailService = require("../services/mail.service");
require("dotenv").config();

const emailQueue = new Queue("emailQueue", {
    redis: {
        host: 'localhost',
        port: 6379
      },
    limiter: {
        max: 10,
        duration: 1000
    }
});

// Process emails in the queue
emailQueue.process(async ({email,subject,text}) => {
    try {
        console.log("Queue processing.....");
        await emailService({
            email,
            subject,
            text
        });
    } catch (error) {
        console.error(`Error sending email: ${error.message}`);
    }
});

// Error handling
emailQueue.on("failed", (job, err) => {
    console.error(`Job ${job.id} failed: ${err.message}`);
});

module.exports = emailQueue;