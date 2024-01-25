import cron from 'node-cron';
import twilio from 'twilio';
import Task from '../models/taskModel.js';

const startCronJobs = () => {
  // Twilio credentials
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioClient = new twilio(accountSid, authToken);

  // Schedule the cron job to run every 5 seconds for testing purpose
  cron.schedule('*/5 * * * * *', async () => {
    try {
      const tasks = await Task.find({ dueDate: { $exists: true, $ne: null } });

      tasks.forEach(async task => {
        try {
          if (task.dueDate) {
            const today = new Date();
            const dueDate = new Date(task.dueDate);

            const timeDiff = dueDate.getTime() - today.getTime();
            const daysDiff = Math.ceil(timeDiff / (24 * 60 * 60 * 1000));

            if (daysDiff === 0) {
              task.priority = 0; // Due date is today
            } else if (daysDiff <= 2) {
              task.priority = 1; // Due date is between tomorrow and day after tomorrow
            } else if (daysDiff <= 4) {
              task.priority = 2; // Due date is between 3 and 4 days
            } else {
              task.priority = 3; // Due date is 5 or more days away
            }
          }

          await task.save();
          console.log(`Priority updated for task with ID: ${task._id}`);
        } catch (error) {
          console.error(
            `Error updating priority for task with ID: ${task._id} - ${error.message}`
          );
        }
      });

      console.log('Task priorities updated successfully.');
    } catch (error) {
      console.error('Error updating task priorities:', error.message);
    }
  });

  // Schedule the cron job to run every 5 seconds for testing purpose
  cron.schedule('*/5 * * * * *', async () => {
    try {
      const overdueTasks = await Task.find({
        dueDate: { $lt: new Date() },
        status: { $ne: 'DONE' } // Exclude completed tasks
      }).populate('user');

      for (const task of overdueTasks) {
        const userPriority = task.user.priority;

        try {
          await twilioClient.calls.create({
            to: `+${task.user.phoneNumber}`,
            from: `+${process.env.TWILIO_PHONE_NUMBER}`,
            url: 'http://demo.twilio.com/docs/voice.xml' // Replace with your webhook URL
          });

          console.log(`Voice call made to user with priority ${userPriority}`);
          break; // Break after making a successful call
        } catch (error) {
          console.error(`Error making voice call: ${error.message}`);
        }
      }

      console.log('Voice calls completed successfully.');
    } catch (error) {
      console.error('Error making voice calls:', error.message);
    }
  });
};

export default startCronJobs;
