# Employee & Task Management System

A full-stack **Employee & Task Management System** built with:

- **Backend:** Node.js, Express, SQLite3  
- **Frontend:** React (Vite), Modern Glassmorphism UI  
- **Database:** SQLite (`database.sqlite`)

Designed and implemented by **Mln Varma (22BCE9592)**.

---

##  Features

###  Employees

- Add new employees with:
  - Name
  - Email (unique)
  - Role
  - Status (`ACTIVE` / `INACTIVE`)
- List all employees with:
  - Name, Email, Role, Status, Created Date
- Filter & search employees by:
  - Name / Email / Role
  - Status (Active / Inactive)
- Delete employees:
  - Automatically unassigns them from tasks (`employee_id` set to `NULL`)

---

### 📋 Tasks

- Add new tasks with:
  - Title (required)
  - Description
  - Status (`TODO`, `IN_PROGRESS`, `DONE`)
  - Priority (`LOW`, `MEDIUM`, `HIGH`)
  - Due Date
  - Assigned Employee (optional)
- Filter tasks by:
  - Search (title, description)
  - Status
- Dashboard metrics:
  - Total Employees
  - Total Tasks
  - Pending Tasks
  - Completed Tasks
- Delete tasks

---

### 🎨 UI Highlights

- Modern glassmorphism-based dashboard
- Separate tabs:
  - **Dashboard**
  - **Employees**
  - **Tasks**
- Quick add forms on the dashboard:
  - Quick Add Employee
  - Quick Add Task
- Animated tables with:
  - Status badges
  - Priority badges
  - Avatars using name initials
- Responsive layout for desktop & smaller screens

---

## 🏗️ Tech Stack

- **Frontend**
  - React
  - Vite
  - Vanilla CSS (inline styles + global keyframes)

- **Backend**
  - Node.js
  - Express
  - SQLite3

- **Database**
  - SQLite database file: `database.sqlite`
  - Tables:
    - `employees`
    - `tasks`

---

## 📁 Project Structure

Example structure:

```bash
project-root/
  backend/
    server.js
    db.js
    database.sqlite        # auto-created on first run
    routes/
      employees.js
      tasks.js

  frontend/
    src/
      App.jsx
      components/
        EmployeeList.jsx
        TaskList.jsx
    index.html
    package.json
    vite.config.js

  README.md



## 🚀 Backend – Setup & Run

### 1. Go to backend folder
```bash
cd backend
2. Install dependencies
bash

npm install
3. Start the server
bash

node server.js
# or
npm start   
Default Backend URL
arduino

http://localhost:4000
🗄️ Database & Tables
db.js creates the SQLite database file automatically:

js

const dbPath = path.join(__dirname, 'database.sqlite');
It will automatically:
Create employees and tasks tables (if they don’t exist)

Insert sample employees and sample tasks if tables are empty

Resetting the Database
If you modify schema, simply delete:

bash

backend/database.sqlite
Restart server → DB will be recreated with fresh structure and sample data.

🌐 Backend API
Health Check
GET /health
Response

json

{
  "status": "OK",
  "timestamp": "2024-02-10T12:34:56.789Z",
  "service": "Employee Task Management API"
}
 Employees API
Base URL: /employees

1. Get all employees
GET /employees
json
Copy code
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@company.com",
    "role": "Software Engineer",
    "status": "ACTIVE",
    "created_at": "2024-02-10T10:00:00.000Z"
  }
]
2. Get employee by ID
GET /employees/:id
3. Create a new employee
POST /employees
Body

json

{
  "name": "New Employee",
  "email": "new.employee@company.com",
  "role": "Developer",
  "status": "ACTIVE"
}
Rules:
name, email, role → required

email → must be unique

4. Update an employee
PUT /employees/:id
json

{
  "name": "Updated Name",
  "email": "updated.email@company.com",
  "role": "Manager",
  "status": "INACTIVE"
}
5. Delete an employee
DELETE /employees/:id
json
Copy code
{
  "message": "Employee deleted successfully",
  "tasksUnassigned": 2
}
📋 Tasks API
Base URL: /tasks

1. Get all tasks
GET /tasks
Example:

json

{
  "id": 1,
  "title": "Implement user authentication",
  "description": "Add login and signup functionality",
  "status": "IN_PROGRESS",
  "priority": "HIGH",
  "dueDate": "2024-02-15",
  "employeeId": 1,
  "employeeName": "John Doe"
}
2. Get task by ID
GET /tasks/:id
3. Create a task
POST /tasks
Body

json

{
  "title": "New Task",
  "description": "Details about the task",
  "status": "TODO",
  "priority": "MEDIUM",
  "dueDate": "2024-02-20",
  "employeeId": 1
}
Rules:
title → required

status → TODO | IN_PROGRESS | DONE

priority → LOW | MEDIUM | HIGH

employeeId → optional

4. Update a task
PUT /tasks/:id
5. Delete a task
DELETE /tasks/:id
