# 🏛️ Sistem Pendataan Laporan dan Dokumentasi

<div align="center">

![SPLD Server](https://img.shields.io/badge/SPLD-Server-blue?style=for-the-badge&logo=server&logoColor=white)
![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

**A robust backend solution for managing regional reports with enterprise-grade security and scalability**

[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Express.js](https://img.shields.io/badge/Express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)](https://expressjs.com/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://postgresql.org/)
[![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)](https://jwt.io/)

[🚀 Quick Start](#-quick-start) • [📚 Documentation](#-api-documentation) • [🤝 Contributing](#-contributing) • [📄 License](#-license)

</div>

---

## 🌟 Overview

The **Sistem Pendataan Laporan dan Dokumentasi (SPLD) Server** is a powerful, scalable backend solution designed to streamline regional report management processes. Built with modern technologies and best practices, it provides a comprehensive API ecosystem for handling reports, user authentication, and data management with enterprise-level security.

### 🎯 Key Highlights

- **🔒 Enterprise Security**: JWT-based authentication with role-based access control
- **⚡ High Performance**: Optimized Express.js architecture with efficient database queries
- **🗄️ Modern Database**: PostgreSQL integration with Prisma ORM for type-safe operations
- **📁 File Management**: Robust file upload and attachment handling
- **🔧 Developer Friendly**: Comprehensive API documentation and easy setup

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🔐 Authentication & Security

- JWT-based secure authentication
- Password hashing and validation
- Session management
- CORS protection
- Rate limiting

### 📊 Report Management

- Create, read, update, delete reports
- Advanced filtering and search
- Report categorization
- Status tracking
- Bulk operations

</td>
<td width="50%">

### 👥 User Management

- Role-based access control (RBAC)
- User profile management
- Permission system
- Admin dashboard support

### 📤 File Operations

- Secure file upload
- Multiple file format support
- File validation and sanitization
- Cloud storage integration ready

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

<div align="center">

| Category           | Technology | Version |
| ------------------ | ---------- | ------- |
| **Runtime**        | Node.js    | ^18.0.0 |
| **Framework**      | Express.js | ^4.18.0 |
| **Database**       | PostgreSQL | ^14.0.0 |
| **ORM**            | Prisma     | ^5.0.0  |
| **Authentication** | JWT        | ^9.0.0  |
| **Language**       | JavaScript | ES2022  |

</div>

---

## 🚀 Quick Start

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [PostgreSQL](https://postgresql.org/) (v14 or higher)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/LVNVoid/SPLD-Server.git
   cd SPLD-Server
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment setup**

   ```bash
   cp .env.example .env
   ```

   Configure your `.env` file:

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/spld_db"
   JWT_SECRET="your-super-secret-jwt-key"
   JWT_EXPIRES_IN="7d"
   NODE_ENV="development"
   PORT=3000
   ```

4. **Database setup**

   ```bash
   # Generate Prisma client
   npx prisma generate

   # Run migrations
   npx prisma migrate dev

   # Seed database (optional)
   npx prisma db seed
   ```

5. **Start the server**

   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

🎉 **Success!** Your server is now running at `http://localhost:3000`

---

## 📚 API Documentation

### Base URL

```
http://localhost:3000/api/
```

### Authentication Endpoints

- `POST /auth/login` - User login
- `POST /auth/logout` - User logout

### Report Endpoints

- `GET /reports` - Get all reports
- `POST /reports` - Create new report
- `GET /reports/:id` - Get report by ID
- `PUT /reports/:id` - Update report
- `DELETE /reports/:id` - Delete report

### User Management

- `GET /users` - Get all users (Admin only)
- `GET /users/profile` - Get current user profile
- `PUT /users/profile` - Update user profile

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

---

## 🚦 Project Structure

```
SPLD-Server/
├── 📁 src/
│   ├── 📁 controllers/     # Request handlers
│   ├── 📁 middleware/      # Custom middleware
│   ├── 📁 models/          # Database models
│   ├── 📁 routes/          # API routes
│   ├── 📁 services/        # Business logic
│   ├── 📁 utils/           # Utility functions
│   └── 📄 app.js           # Express app setup
├── 📁 prisma/
│   ├── 📄 schema.prisma    # Database schema
│   └── 📁 migrations/      # Database migrations
├── 📁 tests/               # Test files
├── 📄 .env.example         # Environment template
├── 📄 package.json         # Dependencies
└── 📄 README.md           # This file
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow [JavaScript Standard Style](https://standardjs.com/)
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

---

## 📈 Performance & Monitoring

- **Logging**: Winston logger with multiple transports
- **Monitoring**: Built-in health check endpoints
- **Performance**: Response time tracking and optimization
- **Error Handling**: Comprehensive error management system

---

## 🔒 Security Features

- **Data Validation**: Input sanitization and validation
- **SQL Injection Protection**: Prisma ORM prevents SQL injection
- **XSS Protection**: Helmet.js security headers
- **Rate Limiting**: Request rate limiting to prevent abuse
- **CORS**: Configurable cross-origin resource sharing

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🆘 Support

- **Documentation**: Check our [Wiki](https://github.com/LVNVoid/SPLD-Server/wiki)
- **Issues**: [GitHub Issues](https://github.com/LVNVoid/SPLD-Server/issues)
- **Discussions**: [GitHub Discussions](https://github.com/LVNVoid/SPLD-Server/discussions)

---

<div align="center">

**Made with ❤️ by the SPLD Team**

[⭐ Star this repo](https://github.com/LVNVoid/SPLD-Server) | [🐛 Report Bug](https://github.com/LVNVoid/SPLD-Server/issues) | [💡 Request Feature](https://github.com/LVNVoid/SPLD-Server/issues)

</div>
