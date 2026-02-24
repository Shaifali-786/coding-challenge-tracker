const cron = require("node-cron");
const Challenge = require("../models/Challenge");
const User = require("../models/User");
const nodemailer = require("nodemailer");

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// TEST MODE: every 1 hour
cron.schedule('0 * * * *', async () => {
  try {
    console.log("Checking for pending tasks...");

    const challenges = await Challenge.find().populate("user");

    console.log("Total challenges:", challenges.length);

    for (const challenge of challenges) {
      for (const day of challenge.daysProgress) {
        if (!day.isCompleted) {
          // Calculate actual date of this day
          const dayDate = new Date(challenge.startDate);
          dayDate.setDate(dayDate.getDate() + (day.dayNumber - 1));

          const endTime = new Date(dayDate);
          endTime.setHours(23, 59, 59, 999);

          const now = new Date();
          const hoursLeft = (endTime - now) / (1000 * 60 * 60);

          console.log(
            `Challenge: ${challenge.title} | Day: ${day.dayNumber} | Hours Left: ${hoursLeft}`,
          );

          // TEST CONDITION: send if any incomplete
          // 4 hours before end
          const fourHoursBefore = new Date(
            endTime.getTime() - 4 * 60 * 60 * 1000,
          );

          if (
            !day.isCompleted &&
            now >= fourHoursBefore &&
            now <= endTime &&
            !day.reminderSent
          ) {
            // 3o min cooldown

            await transporter.sendMail({
              from: process.env.EMAIL_USER,
              to: challenge.user.email,
              subject: "⏰ Reminder: Complete Today's Challenge!",
              text: `Hi ${challenge.user.name}, don't forget to complete Day ${day.dayNumber} of "${challenge.title}" 🚀`,
            });

            // Email bhejne ke baad update karo:

            day.reminderSent = true;
            await challenge.save();

            console.log("✅ Reminder Sent!");
          }

          break; // only first incomplete day
        }
      }
    }
  } catch (error) {
    console.error("Reminder Error:", error);
  }
});
