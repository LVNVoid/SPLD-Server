# 🏢 SPLD Server

<div align="center">

![SPLD Server Banner](https://img.shields.io/badge/SPLD-Server-blue?style=for-the-badge&logo=server&logoColor=white)

**🚀 A Modern Regional Report Management System**

_Enterprise-grade backend solution for streamlined regional reporting_

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white)](https://postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white)](https://prisma.io/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)

[📖 Documentation](#-documentation) • [🚀 Quick Start](#-quick-start) • [🔧 API Reference](#-api-reference) • [🤝 Contributing](#-contributing)

</div>

---

## ✨ What is SPLD Server?

**SPLD (Sistem Pendataan Laporan dan Dokumentasi) Server** is a cutting-edge backend solution designed to revolutionize regional report management. Built with modern technologies and enterprise-grade security, it provides a comprehensive ecosystem for handling reports, user authentication, and data management.

### 🎯 Key Features

<table>
<tr>
<td>

🔐 **Enterprise Security**

- JWT-based authentication
- Role-based access control
- SQL injection protection
- XSS prevention

</td>
<td>

⚡ **High Performance**

- Optimized Express.js architecture
- Efficient database queries
- Response time tracking
- Built-in caching

</td>
</tr>
<tr>
<td>

🗄️ **Modern Database**

- PostgreSQL integration
- Prisma ORM for type safety
- Automated migrations
- Database seeding

</td>
<td>

📁 **File Management**

- Secure file uploads
- Attachment handling
- Storage optimization
- Multiple format support

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

<div align="center">

| Category         | Technology | Version | Purpose                   |
| ---------------- | ---------- | ------- | ------------------------- |
| 🚀 **Runtime**   | Node.js    | ^18.0.0 | JavaScript runtime        |
| 🌐 **Framework** | Express.js | ^4.18.0 | Web application framework |
| 🗄️ **Database**  | PostgreSQL | ^14.0.0 | Primary database          |
| 🔗 **ORM**       | Prisma     | ^5.0.0  | Database toolkit          |
| 🔑 **Auth**      | JWT        | ^9.0.0  | Authentication tokens     |
| 📝 **Language**  | JavaScript | ES2022  | Programming language      |

</div>

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

<div align="center">

[![Node.js](https://img.shields.io/badge/Node.js-v18+-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v14+-blue?style=for-the-badge&logo=postgresql)](https://postgresql.org/)
[![Git](https://img.shields.io/badge/Git-latest-orange?style=for-the-badge&logo=git)](https://git-scm.com/)

</div>

### 📥 Installation

```bash
# 1️⃣ Clone the repository
git clone https://github.com/LVNVoid/SPLD-Server.git
cd SPLD-Server

# 2️⃣ Install dependencies
npm install

# 3️⃣ Setup environment variables
cp .env.example .env
```

### ⚙️ Environment Configuration

Edit your `.env` file with your configuration:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/spld_db"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"

# Server Configuration
NODE_ENV="development"
PORT=3000

# File Upload Configuration
MAX_FILE_SIZE="10mb"
UPLOAD_PATH="./uploads"
```

### 🗄️ Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed the database (optional)
npx prisma db seed
```

### 🏃‍♂️ Running the Server

```bash
# Development mode with hot reload
npm run dev

# Production mode
npm start

# Run with PM2 (recommended for production)
npm run pm2:start
```

<div align="center">

🎉 **Success!** Your server is now running at `http://localhost:3000`

</div>

---

## 🔧 API Reference

### 🔐 Authentication

<details>
<summary><b>Authentication Endpoints</b></summary>

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

```http
POST /api/auth/logout
Authorization: Bearer <token>
```

</details>

### 📊 Reports Management

<details>
<summary><b>Reports Endpoints</b></summary>

| Method   | Endpoint           | Description       | Auth Required |
| -------- | ------------------ | ----------------- | ------------- |
| `GET`    | `/api/reports`     | Get all reports   | ✅            |
| `POST`   | `/api/reports`     | Create new report | ✅            |
| `GET`    | `/api/reports/:id` | Get report by ID  | ✅            |
| `PUT`    | `/api/reports/:id` | Update report     | ✅            |
| `DELETE` | `/api/reports/:id` | Delete report     | ✅ (Admin)    |

</details>

### 👥 User Management

<details>
<summary><b>User Endpoints</b></summary>

| Method | Endpoint             | Description              | Auth Required |
| ------ | -------------------- | ------------------------ | ------------- |
| `GET`  | `/api/users`         | Get all users            | ✅ (Admin)    |
| `GET`  | `/api/users/profile` | Get current user profile | ✅            |
| `PUT`  | `/api/users/profile` | Update user profile      | ✅            |

</details>

### 📁 File Management

<details>
<summary><b>File Endpoints</b></summary>

```http
POST /api/files/upload
Content-Type: multipart/form-data
Authorization: Bearer <token>

FormData: file=<file>
```

</details>

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests with coverage report
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Run integration tests
npm run test:integration
```

---

## 📁 Project Structure

```
SPLD-Server/
├── 🏗️  src/
│   ├── 🎮 controllers/     # Request handlers & business logic
│   ├── 🛡️  middleware/     # Custom middleware functions
│   ├── 🗃️  models/         # Database models & schemas
│   ├── 🛣️  routes/         # API route definitions
│   ├── ⚙️  services/       # Business logic services
│   ├── 🔧 utils/          # Utility functions & helpers
│   └── 📄 app.js          # Express application setup
├── 🗄️  prisma/
│   ├── 📋 schema.prisma   # Database schema definition
│   ├── 🔄 migrations/     # Database migration files
│   └── 🌱 seeds/          # Database seed files
├── 🧪 tests/              # Test files & test utilities
├── 📁 uploads/            # File upload directory
├── 🌍 .env.example        # Environment variables template
├── 📦 package.json        # Project dependencies & scripts
└── 📖 README.md          # Project documentation
```

---

## 🔒 Security Features

<div align="center">

| Feature              | Implementation             | Status |
| -------------------- | -------------------------- | ------ |
| **Authentication**   | JWT Tokens                 | ✅     |
| **Authorization**    | Role-based Access Control  | ✅     |
| **SQL Injection**    | Prisma ORM Protection      | ✅     |
| **XSS Protection**   | Helmet.js Security Headers | ✅     |
| **Rate Limiting**    | Express Rate Limiter       | ✅     |
| **CORS**             | Configurable CORS Policy   | ✅     |
| **Input Validation** | Joi Schema Validation      | ✅     |
| **Password Hashing** | bcrypt Encryption          | ✅     |

</div>

---

## 📈 Performance & Monitoring

- **📊 Logging**: Winston logger with multiple transports
- **💓 Health Checks**: Built-in health monitoring endpoints
- **⏱️ Performance Tracking**: Response time measurement
- **🚨 Error Handling**: Comprehensive error management
- **📋 Request Validation**: Input sanitization and validation
- **📊 Metrics**: Built-in performance metrics collection

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### 🔄 Development Workflow

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### 📋 Contribution Guidelines

- ✅ Follow [JavaScript Standard Style](https://standardjs.com/)
- ✅ Write comprehensive tests for new features
- ✅ Update documentation as needed
- ✅ Ensure all tests pass before submitting PR
- ✅ Add detailed commit messages

### 🐛 Bug Reports

Found a bug? Please create an issue with:

- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- System information

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🔗 Links & Resources

<div align="center">

[![Documentation](https://img.shields.io/badge/📖_Documentation-Wiki-blue?style=for-the-badge)](https://github.com/LVNVoid/SPLD-Server/wiki)
[![Issues](https://img.shields.io/badge/🐛_Issues-GitHub-red?style=for-the-badge)](https://github.com/LVNVoid/SPLD-Server/issues)
[![Discussions](https://img.shields.io/badge/💬_Discussions-GitHub-green?style=for-the-badge)](https://github.com/LVNVoid/SPLD-Server/discussions)

</div>

---

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape this project
- Special thanks to the open-source community for the amazing tools
- Inspired by modern backend architecture patterns

---

<div align="center">

**Made with ❤️ by the SPLD Team**

⭐ **Star this repo if you find it helpful!** ⭐

</div>
