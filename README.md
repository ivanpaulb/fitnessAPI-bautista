# 🏋️ Fitness Tracker API

A simple Node.js + Express + MongoDB API for tracking personal workouts.

---

## 📦 Installation

```bash
git clone https://github.com/ivanpaulb/fitnessAPI-bautista.git
cd fitnessAPI-bautista
npm install
```


## ▶️ Start the Server

```bash
node index.js
```

---

## 🧪 Test Account

Use this to test protected routes:

```
email: ivan@mail.com
password: Testing9!
```

---

## 📘 API Endpoints

---

### 🔐 Auth Routes

#### 📌 Register a new user
`POST /users/register`

**Request Body:**
```json
{
  "email": "test@example.com",
  "password": "test1234"
}
```

**Response:**
```json
{
  "message": "User registered successfully"
}
```

---

#### 📌 Login
`POST /users/login`

**Request Body:**
```json
{
  "email": "test@example.com",
  "password": "test1234"
}
```

**Response:**
```json
{
  "access": "your_jwt_token"
}
```

---

### 👤 User Route

#### 📌 Get Current User Details
`GET /users/details`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "_id": "user_id_here",
  "email": "test@example.com"
}
```

---

### 🏃 Workout Routes

> All workout routes require authentication via `Authorization: Bearer <token>`

---

#### 📌 Create Workout
`POST /workouts/addWorkout`

**Request Body:**
```json
{
  "name": "Morning Run",
  "duration": "30 mins",
}
```

**Response:**
```json
{
  "_id": "workout_id",
  "name": "Morning Run",
  "duration": "30 mins",
  "status": "pending",
  "userId": "user_id",
  "dateAdded": "2025-04-24T12:00:00Z"
}
```

---

#### 📌 Get All My Workouts
`GET /workouts/getMyWorkouts`

**Response:**
```json
{
  "workouts": [
    {
      "_id": "workout_id",
      "name": "Morning Run",
      "duration": 30,
      "status": "pending",
      "userId": "user_id",
      "dateAdded": "2025-04-24T12:00:00Z"
    }
  ]
}
```

---

#### 📌 Update a Workout
`PATCH /workouts/updateWorkout/:id`

**Request Body:**
```json
{
  "name": "Evening Run",
  "duration": "45 mins"
}
```

**Response:**
```json
{
      "message": "Workout updated successfully",
      "updatedWorkout": {
          "_id": "workout_id",
          "name": "Evening Run",
          "duration": "45 mins",
          "status": "pending",
          "userId": "user_id",
          "dateAdded": "2025-04-24T03:38:36.026Z",
          "__v": 0
      }
}
```

---

#### 📌 Delete a Workout
`DELETE /workouts/deleteWorkout/:id`

**Response:**
```json
{
  "message": "Workout deleted successfully"
}
```

---

#### 📌 Mark a Workout as Complete
`PATCH /workouts/completeWorkoutStatus/:id`

**Response:**
```json
{
      "message": "Workout status updated successfully",
      "updatedWorkout": {
          "_id": "workout_id",
          "name": "Evening Run",
          "duration": "45 mins",
          "status": "completed",
          "userId": "user_id",
          "dateAdded": "2025-04-24T03:38:36.026Z",
          "__v": 0
      }
}
```

---

## 🛡️ Authentication

All protected routes require the following header:

```
Authorization: Bearer <JWT token>
```

---

## 📫 Contact

Made by Ivan Bautista — feel free to reach out for help or improvements.
