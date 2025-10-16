# TECH HR - Human Resource Management System

A comprehensive Human Resource Management System designed for IT companies, enabling managers, employees, and HR administrators to efficiently manage tasks, employee profiles, accounts, payroll, training programs, and more.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## ✨ Features

- **User Management**: Handle employee profiles and account information
- **Task Management**: Assign and track tasks across teams
- **Payroll Management**: Automated payroll processing and management
- **Training Programs**: Organize and manage employee training sessions
- **Department Management**: Organize employees by departments
- **Vacation Management**: Track and approve employee vacation requests
- **Visitor Management**: Register and manage company visitors
- **Real-time Messaging**: Built-in messaging system with Socket.IO
- **Authentication & Authorization**: Secure login with JWT-based authentication
- **Role-based Access Control**: Different access levels for managers, employees, and HR admins

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Material-UI (MUI)** - React component library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Chart.js & Recharts** - Data visualization
- **Socket.IO Client** - Real-time communication
- **React Big Calendar** - Calendar component
- **React Toastify** - Notification system

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Prisma** - Modern database ORM
- **PostgreSQL** - Relational database
- **Socket.IO** - Real-time bidirectional communication
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Nodemailer** - Email sending

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

## 📦 Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Package manager (comes with Node.js)
- **Docker** - [Download](https://www.docker.com/products/docker-desktop)
- **Git** - [Download](https://git-scm.com/)

## 🚀 Installation

### 1. Clone the Repository

```sh
git clone https://github.com/Chouikhi-abdallah/HRM-System-ISIMG.git
cd HRM-System-ISIMG
```

### 2. Setup Database with Docker

Navigate to the root directory and start the database containers:

```sh
docker-compose up -d
```

This command will start:
- **PostgreSQL** database on port `5434`
- **Adminer** (database management tool) on port `8080`

Verify that the containers are running:

```sh
docker-compose ps
```

You should see both `db` and `adminer` containers running.

**Database Connection Details:**
- Host: `localhost`
- Port: `5434`
- User: `abdallah`
- Password: `root`
- Database: `hrm`

**Access Adminer:**
Open your browser and navigate to `http://localhost:8080` to manage the database via the web interface.

### 3. Setup Backend

Navigate to the backend directory:

```sh
cd backend
```

Install dependencies:

```sh
npm install
```

Set up Prisma and run migrations:

```sh
npx prisma generate
npx prisma migrate deploy
```

*Optional: Seed the database with initial data (if seed script exists)*

```sh
npx prisma db seed
```

### 4. Setup Frontend

Open a new terminal and navigate to the frontend directory:

```sh
cd frontend
```

Install dependencies:

```sh
npm install
```

## 🏃 Running the Application

### Start Backend Server

From the `backend` directory:

```sh
node index.js
```

Or with auto-reload using nodemon:

```sh
npx nodemon index.js
```

The backend server will start on the default port (typically `http://localhost:3000` or as configured).

### Start Frontend Development Server

From the `frontend` directory:

```sh
npm run dev
```

The frontend development server will start, typically on `http://localhost:5173`.

Open your browser and navigate to the URL shown in the terminal to access the application.

## 📁 Project Structure

```
HRM-System-ISIMG/
├── backend/                 # Backend application
│   ├── controllers/        # Request handlers
│   ├── routes/            # API routes
│   ├── prisma/            # Database schema and migrations
│   ├── helpers/           # Utility functions
│   ├── index.js           # Server entry point
│   └── package.json       # Backend dependencies
├── frontend/              # Frontend application
│   ├── src/              # Source files
│   │   ├── assets/       # Images, fonts, etc.
│   │   └── ...
│   ├── public/           # Static files
│   ├── index.html        # HTML entry point
│   ├── vite.config.js    # Vite configuration
│   └── package.json      # Frontend dependencies
├── compose.yaml          # Docker Compose configuration
└── README.md            # Project documentation
```

## 🔧 Troubleshooting

### Database Connection Issues

If you're having trouble connecting to the database:

1. Ensure Docker containers are running: `docker-compose ps`
2. Check if port `5434` is available and not used by another service
3. Verify database credentials in your Prisma configuration
4. Restart containers: `docker-compose down && docker-compose up -d`

### Port Already in Use

If you get an error that a port is already in use:

- **Frontend (5173)**: Change the port in `vite.config.js` or stop the process using that port
- **Backend**: Change the port configuration in the backend code
- **Database (5434)**: Modify the port mapping in `compose.yaml`

### Prisma Issues

If you encounter Prisma-related errors:

```sh
cd backend
npx prisma generate
npx prisma migrate reset  # Warning: This will reset your database
```

### Module Not Found Errors

If you encounter module not found errors:

```sh
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 🛑 Stopping the Application

### Stop Frontend
Press `Ctrl + C` in the terminal running the frontend server.

### Stop Backend
Press `Ctrl + C` in the terminal running the backend server.

### Stop Database Containers

```sh
docker-compose down
```

To also remove volumes (database data):

```sh
docker-compose down -v
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is part of the ISIMG academic curriculum.

## 👥 Authors

- Chouikhi Abdallah - [@Chouikhi-abdallah](https://github.com/Chouikhi-abdallah)

---

**Note**: Make sure to configure your environment variables appropriately before running the application in production.
