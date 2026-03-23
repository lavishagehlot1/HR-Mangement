# HR Management System

## Quick Commands

For a quick start after cloning the repo:

```bash
# 1. Navigate to the project
cd hr-management

# 2. Install dependencies
npm install

# 3. Start the server (using nodemon)
npx nodemon index.js
# or if you added a start script in package.json:
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
* APIs: Login and Register

### Employee Module

* Manage employee records
* CRUD operations for employees
* Admin and HR can manage employee data
* Employees can view their own profile

### Leave Module

* Leave application and approval workflow
* Employees can apply for leave
* Admin and HR can approve/reject leave requests
* Employees can view their leave history

### Attendance Module

* Employee check-in and check-out
* Automated checkout at 12 PM if forgotten (cron job)
* Employees can view their own attendance
* Admin and HR can view all attendance records

---

## Tech Stack

* **Backend:** Node.js, JavaScript
* **Database:** MongoDB
* **API Testing:** Postman
* **Authentication:** JWT
* **Cron Jobs:** Node Cron for automated attendance checkout

---

## Installation & Setup

1. **Clone the repository:**

```bash
git clone https://github.com/lavishagehlot1/hr-management.git
```

2. **Navigate to the project folder:**

```bash
cd hr-management
```

3. **Install dependencies:**

```bash
npm install
```

4. **Create a `.env` file** with the following variables:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

5. **Run the application:**

```bash
npx nodemon index.js
```

> Alternatively, add `"start": "nodemon index.js"` to `package.json` scripts and run `npm start`.

6. **(Optional) Seed the database to create a super admin user:**

```bash
node src/utils/createSuperAdmin.js
```

> ⚠️ Make sure `.env` has the correct `MONGO_URI` before running this script.

---

## Usage

* **Admin:** Manage employees, approve/reject leaves, and view all attendance.
* **HR:** Update employee info, approve/reject leaves, and view all attendance.
* **Employees:** Register, login, apply for leave, check-in/check-out, and view their own profile and attendance.

> For protected routes, include the JWT token in Postman:

```text
Authorization: Bearer <token>
```

---

## API Reference

| Module         | Endpoint               | Method | Role(s) Allowed     | Description                                              |
| -------------- | ---------------------- | ------ | ------------------- | -------------------------------------------------------- |
| **Auth**       | `/login`               | POST   | Admin, Employee, HR | User login with JWT authentication                       |
|                | `/register`            | POST   | Admin               | Register a new employee                                  |
| **Employee**   | `/employees`           | POST   | Admin               | Create employee                                          |
|                | `/employees`           | GET    | Admin, HR           | Get all employees                                        |
|                | `/employees/:id`       | GET    | Admin, HR           | Get employee by ID                                       |
|                | `/employees/:id`       | PUT    | Admin, HR           | Update employee by ID                                    |
|                | `/employees/:id`       | DELETE | Admin               | Delete employee                                          |
|                | `/employees/profile`   | GET    | Employee            | Get own profile                                          |
| **Leave**      | `/leave/apply`         | POST   | Employee            | Apply for leave                                          |
|                | `/leave/reject/:id`    | POST   | Admin, HR           | Reject leave request by ID                               |
|                | `/leave/approve/:id`   | POST   | Admin, HR           | Approve leave request by ID                              |
|                | `/leave/history`       | GET    | Employee            | View own leave history                                   |
|                | `/leave/requests`      | GET    | Admin, HR           | View all leave requests                                  |
| **Attendance** | `/attendance/checkin`  | POST   | Employee            | Employee check-in                                        |
|                | `/attendance/checkout` | POST   | Employee            | Employee check-out                                       |
|                | `/attendance/me`       | GET    | Employee            | View own attendance                                      |
|                | `/attendance/all`      | GET    | Admin, HR           | View all attendance records                              |
| **Cron Job**   | N/A                    | N/A    | System              | Automatically checks out employees at 12 PM if forgotten |

---

## Project Structure

```text
hr-management/
├── src/
│   ├── config/
│   │   └── db.js                          # MongoDB connection setup
│   ├── controllers/
│   │   ├── authController/
│   │   │   └── authController.js          # Auth APIs: login, register
│   │   ├── employeeController/
│   │   │   └── employeeController.js     # Employee APIs
│   │   ├── attendanceController/
│   │   │   └── attendanceController.js   # Attendance APIs
│   │   └── leaveController/
│   │       └── leaveController.js        # Leave APIs
│   ├── models/
│   │   ├── attendanceModel.js             # Attendance schema
│   │   ├── authModel.js                   # Auth schema
│   │   ├── leaveModel.js                  # Leave schema
│   │   └── employeeModel.js               # Employee schema
│   ├── middlewares/
│   │   ├── authMiddleware.js              # JWT authentication
│   │   ├── globalErrorHandler.js          # Global error handler
│   │   └── authorizeRole.js               # Role-based access control
│   ├── routes/
│   │   ├── authRoutes.js                  # Auth routes
│   │   ├── attendanceRoutes.js            # Attendance routes
│   │   ├── employeeRoutes.js              # Employee routes
│   │   └── leaveRoutes.js                 # Leave routes
│   ├── services/
│   │   ├── attendance.js                  # Attendance helper functions
│   │   └── generateToken.js               # JWT generation helper
│   ├── utils/
│   │   ├── apiResponse.js                 # Standardized API response
│   │   ├── appError.js                    # Custom error handling class
│   │   ├── createSuperAdmin.js            # Super admin creation script
│   │   └── statusCode.js                  # Standard HTTP status codes
│   ├── cron/
│   │   └── autoCheckOut.js                # Cron job for automatic checkout
│   └── app.js                              # Express app setup
├── .env                                    # Environment variables
├── .gitignore                              # Files to ignore in Git
├── index.js                                # Application entry point
├── package.json                            # Node.js dependencies
└── package-lock.json                       # Dependency lock file
```

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## License

This project is licensed under the MIT License.

---

