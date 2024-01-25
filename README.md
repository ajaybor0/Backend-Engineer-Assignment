# Project Documentation

This documentation provides an overview of the project structure, API endpoints, database models, and instructions for setting up and testing the project. The project is built using Node.js, Express.js, and MongoDB.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Setup Instructions](#setup-instructions)
3. [API Endpoints](#api-endpoints)
4. [Database Models](#database-models)
5. [Authentication](#authentication)
6. [Error Handling](#error-handling)
7. [Cron Jobs](#cron-jobs)
8. [Testing](#testing)
9. [Postman Collection](#postman-collection)

## Project Overview

The project involves creating APIs for task management, including tasks, subtasks, and cron jobs for task priority and Twilio voice calling. It also emphasizes proper validation, error handling, and user authentication using JWT.

## Setup Instructions

1. Fork the repository to your GitHub account.
2. Clone the forked repository to your local machine

   ```bash
   git clone https://github.com/your-username/Backend-Engineer-Assignment.git
   ```

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

## Cron Jobs

### 1. Change Priority based on Due Date

- **Logic:** Priorities are assigned based on the due date of tasks.
  - Priority 0: Due date is today.
  - Priority 1: Due date is between tomorrow and the day after tomorrow.
  - Priority 2: Due date is 3-4 days from today.
  - Priority 3: Due date is 5 days or more from today.

### 2. Twilio Voice Calling

- **Logic:** Twilio voice calls are triggered if a task passes its due date. Calling priority is determined by the user's priority.
  - Users with priority 0 are called first, followed by priority 1, and then priority 2.
  - A user is called only if the previous user does not attend the call.

## Testing

Postman can be used to test all the APIs. Ensure that proper authentication tokens are included in the requests. Test cases should cover various scenarios, including valid and invalid inputs, error handling, and the proper functioning of cron jobs.

## Postman Collection

A Postman collection is provided in the repository (`Tasks Management.postman_collection.json`). Import this collection into Postman for easy testing of the APIs.

---

Feel free to reach out if you have any questions or need further clarification on any aspect of the project. Good luck!
