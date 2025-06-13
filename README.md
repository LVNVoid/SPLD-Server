# 📝 Regional Report Management System — Backend

<p align="center">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens" />
</p>

A powerful and secure backend service for the **Regional Report Management System (SPLD)**, built using Node.js and Express.js. It provides robust APIs for handling reports, user authentication, file uploads, and database integration using Prisma and PostgreSQL.

---

## ✨ Features

- 🔐 **User Authentication**  
  Secure JWT-based authentication for protecting routes and managing user sessions.

- 📊 **Report Management**  
  Full CRUD APIs for creating, reading, updating, and deleting regional reports.

- 🗄️ **Database Integration**  
  Prisma ORM for clean, type-safe interactions with PostgreSQL.

- 📤 **File Upload Support**  
  Allows file attachments, such as images or documents, to be uploaded with reports.

- 👮 **Role-Based Access Control (RBAC)**  
  Fine-grained access control based on user roles (e.g., Admin, Operator, Monitor).

---

## 🛠 Tech Stack

- **Language**: JavaScript  
- **Framework**: Node.js + Express.js  
- **Database**: PostgreSQL  
- **ORM**: Prisma  
- **Authentication**: JWT  

---

## 🚀 Getting Started

Follow these steps to get the server up and running locally:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/LVNVoid/SPLD-Server
   cd SPLD-Server
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**

   - Copy `.env.example` to `.env`
   - Update the values to match your database and JWT settings

4. **Run database migrations:**

   ```bash
   npx prisma migrate dev
   ```

5. **(Optional) Seed the database:**

   ```bash
   npx prisma db seed
   ```

6. **Start the development server:**

   ```bash
   npm start
   ```

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

1. Fork the repository  
2. Create a new branch: `git checkout -b feature/your-feature-name`  
3. Commit your changes: `git commit -m "Add: your feature description"`  
4. Push to your branch: `git push origin feature/your-feature-name`  
5. Open a Pull Request  

---

## 📄 License

Currently unspecified. Please contact the repository owner for more information.

---

> _This README was inspired by [README.MD Generator](https://github.com/emRival) — built with ❤️ by [emRival](https://github.com/emRival)_