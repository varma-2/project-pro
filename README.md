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
