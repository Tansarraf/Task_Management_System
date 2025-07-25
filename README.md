# Task Management System

### A simple backend application designed to manage your tasks with full CRUD(Create, Read, Update, Delete) functionality using **Node.Js, Express and MySQL**. Supports both an in-memory storage and a database managed by MySQL.

---

## Tech Stack
- Node.js
- Express
- Swagger/OpenAPI (for API documentation)
- MySQL (for managing database)

---
  
## Required Dependencies
- express
- mysql2
- dotenv
- uuid
- swagger-jsdoc
- swagger-ui-express
- nodemon

---

## Setup Instructions

**1. Clone the repository**
- git clone https://github.com/Tansarraf/Task_Management_System.git
- cd Task_Management_System

**2. Install Dependencies**
For installing the required dependencies, run the following command in project terminal
-> npm install *dependency name*

**3. Configure Environment Variables**
In your .env file in root directory, add your MySql credentials like this:

DB_HOST = localhost
DB_USER = your_mysql_username
DB_PASSWORD = your_mysql_password
DB_NAME = task_db
DB_PORT = 3306
PORT = 3000

**4. Setup the MySql database**
Create a table in MySQL workbench for managing database

CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status ENUM('pending', 'in-progress', 'completed') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

**5. Start server**
npm start

**6. Swagger API Docs**
Interactive documentation for all the APIs is available at : http://localhost:3000/api-docs

---

## Contributing
Have ideas for improvement? Feel free to fork the repository, make changes, and submit a pull request!

---

## Contact
For any queries or suggestions, reach out via sarraftanishk4@gmail.com or open an issue on GitHub.
