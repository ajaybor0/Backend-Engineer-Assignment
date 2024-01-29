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

<<<<<<< HEAD
8. **Delete Subtask**
   - Soft Deletion
=======
   ```bash
   cd Backend-Engineer-Assignment
   ```

3. Create a MongoDB database and obtain your MongoDB URI from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
4. Create a Twilio account and obtain your Account Sid,Auth Token & Phone Number from [Twilio](https://www.twilio.com/en-us).

5. Rename the `.env.example` file to `.env` and add the following environment variables:.

   ```
   NODE_ENV=development
   PORT=5000
   JWT_SECRET=YOUR_JWT_SECRET
   MONGO_URI=YOUR_MONGO_URI
   TWILIO_ACCOUNT_SID=YOUR_TWILIO_ACCOUNT_SID
   TWILIO_AUTH_TOKEN=YOUR_TWILIO_AUTH_TOKEN
   TWILIO_PHONE_NUMBER=YOUR_TWILIO_PHONE_NUMBER
   ```

6. Install dependencies.

   ```bash
   npm install
   ```

7. Run the application.

   ```bash
   npm start
   ```

   or

   ```bash
   npm run dev
   ```

8. The application should now be running on `http://localhost:5000`.

## API Endpoints

### 1. Create Task

- **Endpoint:** `POST /api/v1/tasks`
- **Input:**
  - `title` (string)
  - `description` (string)
  - `dueDate` (date)
- **Authorization:** JWT token required

### 2. Create Subtask

- **Endpoint:** `POST /api/v1/sub-tasks/:id`
- **Input:**
  - `taskId` (Number)
- **Authorization:** JWT token required

### 3. Get All User Tasks

- **Endpoint:** `GET /api/v1/tasks`
- **Query Parameters:**
  - `priority` (Number, optional)
  - `dueDate` (date, optional)
  - `page` (Number, optional)
  - `limit` (Number, optional)
- **Authorization:** JWT token required

### 4. Get All User Subtasks

- **Endpoint:** `GET /api/v1/sub-tasks/:id`
- **Path Parameters:**
  - `taskId` (Number)
- **Query Parameters:**
  - `taskId` (Number, optional)
- **Authorization:** JWT token required

### 5. Update Task

- **Endpoint:** `PUT /api/v1/tasks/:id`
- **Input:**
  - `dueDate` (date, optional)
  - `status` ("TODO" or "DONE", optional)
- **Authorization:** JWT token required

### 6. Update Subtask

- **Endpoint:** `PUT /api/v1/sub-tasks/:id`
- **Input:**
  - `status` (0 or 1)
- **Authorization:** JWT token required

### 7. Delete Task (Soft Deletion)

- **Endpoint:** `PATCH /api/v1/tasks/:id`
- **Authorization:** JWT token required

### 8. Delete Subtask (Soft Deletion)

- **Endpoint:** `PATCH /api/v1/sub-tasks/:id`
- **Authorization:** JWT token required

## Database Models

### 1. Task Model

```javascript
{
  _id: ObjectId, // Generate by MongoDB
  title: String,
  description: String,
  dueDate: Date,
  priority: Number,
  status: String,
  subtasks: Array, // Subtask schema
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date // Soft deletion field
}
```

### 2. Subtask Model

```javascript
{
  _id: ObjectId, // Generate by MongoDB
  taskId: ObjectId, // Reference to Task Model
  status: Number,
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date
}
```

### 3. User Model

```javascript
{
  _id: ObjectId, // Generate by MongoDB
  phoneNumber: Number,
  priority: Number
}
```

## Authentication

JWT (JSON Web Token) is used for user authentication.

## Error Handling

Proper validation is implemented for input parameters. User-friendly error messages are returned for invalid requests. Additionally, common HTTP error status codes are used for different scenarios.
>>>>>>> 1b2cae4ca944a9bf5c51b701896cd7450ac188af

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