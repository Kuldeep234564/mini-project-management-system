Mini Project Management System
Project Description

This project is a simple Project Management System built using Node.js (Express), MySQL, and a basic HTML/JavaScript frontend.
The system allows users to create projects and manage tasks associated with those projects. Each project can have multiple tasks with different statuses, priorities, and due dates.
The frontend interacts with the backend APIs to perform operations like creating projects, adding tasks, viewing tasks, and deleting data.
This project demonstrates REST API development, database design, and frontend–backend integration.

Technologies Used
Backend

Node.js
Express.js

Frontend

HTML
CSS
JavaScript (Fetch API)

Database

MySQL

Setup Instructions

Follow these steps to run the project on your system.
1. Clone the repository
git clone https://github.com/your-username/project-management-system.git
2. Install dependencies
Navigate to the project folder and install required packages.
npm install

4. Create MySQL Database

Create a database named:

project_manager
4. Create Tables

Run the following SQL queries:

CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT,
    title VARCHAR(255),
    description TEXT,
    status ENUM('todo','in-progress','done'),
    priority ENUM('low','medium','high'),
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id)
);
5. Configure Database Connection

Open the db.js file and update your MySQL credentials.

Example:

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "your_password",
    database: "project_manager"
});
How to Run the Project
Start the backend server
node server.js

or

npm start

The server will run at:

http://localhost:5000
Open the frontend

Open the index.html file in your browser.

You can now:

Create projects

Create tasks

View tasks

API Endpoints
Project APIs
Create Project
POST /projects

Request Body:

{
"name": "Website Development",
"description": "Build company website"
}
Get All Projects (Pagination)
GET /projects?page=1&limit=10
Get Single Project
GET /projects/{id}

Example:

GET /projects/1
Delete Project
DELETE /projects/{id}

Example:

DELETE /projects/1
Task APIs
Create Task
POST /projects/{project_id}/tasks

Example:

POST /projects/1/tasks

Request Body:

{
"title": "Design UI",
"description": "Create dashboard layout",
"status": "todo",
"priority": "high",
"due_date": "2026-03-20"
}
Get Tasks by Project
GET /projects/{project_id}/tasks

Example:

GET /projects/1/tasks
Filter Tasks by Status
GET /projects/{project_id}/tasks?status=todo
Update Task
PUT /tasks/{id}

Example:

PUT /tasks/3
Delete Task
DELETE /tasks/{id}

Example:

DELETE /tasks/3
Features Implemented

Project creation and deletion
Task management for each project
Pagination for projects
Filtering tasks by status
Sorting tasks by due date
RESTful API structure
Simple frontend dashboard
