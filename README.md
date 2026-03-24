# HR Management System

## Quick Commands

For a quick start after cloning the repo:

```bash
# 1. Navigate to the project
cd hr-management

# 2. Install dependencies
npm install

# 3. Start the server
npx nodemon index.js
# or
npm start

# 4. (Optional) Create a super admin
node src/utils/createSuperAdmin.js

# 5. Test APIs in Postman
# Use JWT from login for protected routes:
# Authorization: Bearer <token>
```

---

## Project Description

The **HR Management System** is a backend application designed to automate HR processes including employee management, attendance tracking, leave management, and authentication. It streamlines HR tasks, ensures accurate record keeping, and provides role-based access for admins, HR, and employees.

---

## Features

### Auth Module

* Admin creation using seed script
* Admin can register employees; employees can log in themselves
* Role-based access control (Admin, HR, Employee)
* JWT-based authentication

---

### Employee Module

* Manage employee records
* CRUD operations for employees
* Admin and HR can manage employee data
* Employees can view their own profile

---

### Leave Module

* Leave application and approval workflow
* Employees can apply for leave
* Admin and HR can approve/reject leave requests
* Employees can view their leave history

---

### Attendance Module

* Employee check-in and check-out
* Automated checkout at 12 PM if forgotten (cron job)
* Employees can view their own attendance
* Admin and HR can view all attendance records

---

### Validation (Joi)

* Request validation using Joi
* Centralized validation middleware
* Supports validation for:

  * Request body
  * Query parameters
  * Route params
* Prevents invalid data from reaching controllers

---

### Pagination

* Pagination support for large datasets
* Used in Employees, Attendance, and Leave modules
* Improves performance and response time

---

## Tech Stack

* **Backend:** Node.js, JavaScript
* **Database:** MongoDB
* **API Testing:** Postman
* **Authentication:** JWT
* **Validation:** Joi
* **Cron Jobs:** Node Cron

---

## Installation & Setup

1. Clone the repository:

```bash
git clone https://github.com/lavishagehlot1/hr-management.git
```

2. Navigate to project:

```bash
cd hr-management
```

3. Install dependencies:

```bash
npm install
```

4. Create `.env` file:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

5. Run the app:

```bash
npx nodemon index.js
```

---

## Usage

### Roles

* **Admin:** Manage employees, approve/reject leaves, view attendance
* **HR:** Update employees, approve/reject leaves, view attendance
* **Employee:** Login, apply leave, check-in/out, view profile

---

### Pagination Example

```text
GET /employees?page=1&limit=10
GET /attendance/all?page=2&limit=5
GET /leave/requests?page=1&limit=20
```

---

## API Reference

| Module     | Endpoint               | Method | Role(s) Allowed | Description        |
| ---------- | ---------------------- | ------ | --------------- | ------------------ |
| Auth       | `/login`               | POST   | All             | Login              |
|            | `/register`            | POST   | Admin           | Register employee  |
| Employee   | `/employees`           | POST   | Admin           | Create employee    |
|            | `/employees`           | GET    | Admin, HR       | Get all employees  |
|            | `/employees/:id`       | GET    | Admin, HR       | Get employee by ID |
|            | `/employees/:id`       | PUT    | Admin, HR       | Update employee    |
|            | `/employees/:id`       | DELETE | Admin           | Delete employee    |
|            | `/employees/profile`   | GET    | Employee        | Own profile        |
| Leave      | `/leave/apply`         | POST   | Employee        | Apply leave        |
|            | `/leave/approve/:id`   | POST   | Admin, HR       | Approve leave      |
|            | `/leave/reject/:id`    | POST   | Admin, HR       | Reject leave       |
|            | `/leave/history`       | GET    | Employee        | Leave history      |
|            | `/leave/requests`      | GET    | Admin, HR       | All leave requests |
| Attendance | `/attendance/checkin`  | POST   | Employee        | Check-in           |
|            | `/attendance/checkout` | POST   | Employee        | Check-out          |
|            | `/attendance/me`       | GET    | Employee        | Own attendance     |
|            | `/attendance/all`      | GET    | Admin, HR       | All attendance     |

>  These endpoints support pagination using `page` and `limit`.


```

---

## Project Structure

hr-management/
├── src/
│   ├── config/
│   │   └── db.js                                       # MongoDB connection setup
│
│   ├── controllers/                                    # Business logic for each module
│   │   ├── authController/
│   │   │   └── authController.js                       # Handles login & registration
│   │   ├── employeeController/
│   │   │   └── employeeController.js                   # Employee CRUD operations
│   │   ├── attendanceController/
│   │   │   └── attendanceController.js                 # Check-in, check-out logic
│   │   └── leaveController/
│   │       └── leaveController.js                      # Leave apply/approve/reject logic
│
│   ├── models/                                          # Mongoose schemas
│   │   ├── attendanceModel.js                           # Attendance schema
│   │   ├── authModel.js                                 # User/Auth schema
│   │   ├── leaveModel.js                                # Leave schema
│   │   └── employeeModel.js                             # Employee schema
│
│   ├── validations/                                     # Joi validation schemas (NEW)
│   │   ├── authValidation.js                            # Login & register validation
│   │   ├── employeeValidation.js                        # Employee validation rules
│   │   ├── attendanceValidation.js                      # Attendance validation rules
│   │   └── leaveValidation.js                           # Leave validation rules
│
│   ├── middlewares/                                      # Custom middlewares
│   │   ├── authMiddleware.js                             # JWT authentication middleware
│   │   ├── authorizeRole.js                              # Role-based access control
│   │   ├── globalErrorHandler.js                         # Handles all errors globally
│   │   └── validate.js                                   # Joi validation middleware (NEW)
│
│   ├── routes/                                           # API route definitions
│   │   ├── authRoutes.js                                 # Auth routes
│   │   ├── attendanceRoutes.js                           # Attendance routes
│   │   ├── employeeRoutes.js                             # Employee routes
│   │   └── leaveRoutes.js                                # Leave routes
│
│   ├── services/                                         # Helper/service functions
│   │   ├── attendance.js                                 # Attendance utility functions
│   │   └── generateToken.js                              # JWT token generation
│
│   ├── utils/                                            # Reusable utilities
│   │   ├── apiResponse.js                                # Standard success response
│   │   ├── appError.js                                   # Custom error response handler
│   │   ├── createSuperAdmin.js                           # Script to create super admin
│   │   └── statusCode.js                                 # HTTP status codes
│
│   ├── cron/                                            # Scheduled jobs
│   │   └── autoCheckOut.js                              # Auto checkout at 12 PM
│
│   └── app.js                                           # Express app configuration
│
├── .env                                                 # Environment variables
├── .gitignore                                           # Ignored files for git
├── index.js                                             # Application entry point
├── package.json                                         # Project dependencies
└── package-lock.json                                    # Dependency lock file

## Contributing

Pull requests are welcome. Open an issue first for major changes.

---

## License

This project is licensed under the MIT License.


