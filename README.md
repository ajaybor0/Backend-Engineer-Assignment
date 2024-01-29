# Task

You are required to create the following APIs:

1. **Create Task**

   - Input: Title, Description, and Due Date with JWT Auth Token

2. **Create Subtask**

   - Input: Task ID

3. **Get All User Tasks**

   - Filters: Priority, Due Date, Proper Pagination, etc.

4. **Get All User Subtasks**

   - Filters: Task ID (if passed)

5. **Update Task**

   - Fields: Due Date, Status ("TODO" or "DONE")

6. **Update Subtask**

   - Field: Status (0 or 1)

7. **Delete Task**

   - Soft Deletion

8. **Delete Subtask**
   - Soft Deletion

## Cron Jobs

1. **Cron Logic for Changing Priority of Task**

   - Based on Due Date of Task

2. **Cron Logic for Voice Calling using Twilio**
   - Triggered if a Task Passes its Due Date
   - Calling Priority: 0 -> 1 -> 2 (Only if the previous user does not attend the call)

## Instructions

- Proper validation is required for input and user authentication for API calls.
- Implement error handling wherever necessary, and user-friendly errors should be thrown.
- Use [jwt.io](https://jwt.io/) for creating a JWT token with `user_id`, and only corresponding decoding logic should be implemented.
- Update corresponding subtasks in case of task updation and deletion.
- Design the task model according to the given subtask model and user table.
- Task should have priority and status (refer below for both).
- Demonstrate all APIs using Postman.

### Subtask Model

- **id** (int, unique identifier)
- **task_id** (int, references task table)
- **status** (0 - incomplete, 1 - complete)
- **created_at** (date/string)
- **updated_at** (date/string)
- **deleted_at** (date/string)

### User Model

- **id** (int, unique identifier)
- **phone_number** (num)
- **priority** (0, 1, 2) - for Twilio calling priority

### Priority for Task Model

- 0 - Due date is today
- 1 - Due date is between tomorrow and day after tomorrow
- 2 - 3-4
- 3 - 5+

### Status for Task Model

- "TODO" - when no subtask is finished
- "IN_PROGRESS" - when at least 1 subtask is finished
- "DONE" - when every subtask is completed

## Assignment Submission Details

When you're ready, please go ahead and start the assignment.

- Use your own IDE to write the code.
- Once done, upload the code on GitHub.
- Use MongoDB to store the data.
- Use Node.js and Express.js to create APIs.
- Create a README file explaining your project.
- Thoroughly test your project using Postman.

This comprehensive task list ensures that the prospective intern can showcase their skills in frontend and backend development, database integration, security implementation, and documentation. The live changes during the interview assess their ability to adapt and make modifications in real-time, aligning with the dynamic nature of the development environment at TechnoVerse.

**ALL THE BEST!**
