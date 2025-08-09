# 📌 Next.js + Sequelize + MySQL Project

This is a **Next.js** project with **MySQL** database integration using **Sequelize ORM**.  
It includes **authentication**, **JWT-based security**, and seeded dummy data for testing.

---

## 🚀 Features

- **Next.js App Router** for frontend
- **MySQL** database integration with Sequelize
- **Sequelize CLI** for migrations and seeding
- **JWT Authentication** with access, refresh, and verify tokens
- **Dummy data seeding** for quick testing

---

## 📂 Project Structure

.
├── app/ # Next.js App Router pages
├── backend/ # Backend services, models, controllers
├── migrations/ # Sequelize migration files
├── seeders/ # Sequelize seed files
├── models/ # Sequelize models
├── .env # Environment variables
├── package.json
└── README.md

## 🛠 Prerequisites

Make sure you have installed:

- **Node.js** (>= 18.x recommended)
- **MySQL** (with phpMyAdmin optional)
- **npm**, **yarn**, or **pnpm**

---

## 📦 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone <your-repo-url>
cd <your-project-folder>
```

2️⃣ Install Dependencies

npm install

# or

yarn install

# or

pnpm install

3️⃣ Create Database
Before running the app, create a database in MySQL (via phpMyAdmin or MySQL CLI):

phpMyAdmin: Create a database named prac

MySQL CLI: CREATE DATABASE ipangram;

4️⃣ Create .env File
In the root folder, create a .env file and add:

# Database Config

DB_NAME=prac
DB_USERNAME=root
DB_PASSWORD="Abm#2004"
DB_HOST=192.168.1.104
DB_PORT=3306
DB_DIALECT=mysql

# API Base URL

NEXT_PUBLIC_BASE_URL="/api"

# JWT / Auth Tokens

VERIFY_TOKEN_SECRET=8a12b466510a4dbf2616832344431db5d903bdd2bf0d05ce873bd10cc2dde4ad
VERIFY_TOKEN_EXPIRY=15m
ACCESS_TOKEN_SECRET=e22d0121c9cb45f524132bb08629fecf761a78839ecc46822466fe319aa5173d
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=5efb1f6183a72cf2a93a2f56e2eb1fd9aef5a9aaad81f1be1fe7c3a3809f33c6
REFRESH_TOKEN_EXPIRY=7d

⚠️ Important: Change credentials according to your MySQL setup.

5️⃣ Run Database Migrations
npx sequelize-cli db:migrate

6️⃣ Seed Dummy Data
npx sequelize-cli db:seed:all

Seeded Users (all passwords: 123456789):

| Username | Password  |
| -------- | --------- |
| gaurav   | 123456789 |
| admin    | 123456789 |
| abhishek | 123456789 |
| anupam   | 123456789 |
| milan    | 123456789 |
| rahul    | 123456789 |

7️⃣ Run Development Server
npm run dev

# or

npm run start

# or

yarn dev

# or

pnpm dev

App will be live at: http://localhost:3000

🔗 API Endpoints
Auth Routes

| Method | Endpoint             | Description       | Body Params                     |
| ------ | -------------------- | ----------------- | ------------------------------- |
| POST   | `/api/auth/register` | Register new user | `{ username, email, password }` |
| POST   | `/api/auth/login`    | Login user        | `{ email, password }`           |
| POST   | `/api/auth/refresh`  | Refresh token     | `{ refreshToken }`              |
| POST   | `/api/auth/logout`   | Logout user       | `{ refreshToken }`              |

User Routes

| Method | Endpoint         | Description     |
| ------ | ---------------- | --------------- |
| GET    | `/api/users`     | Get all users   |
| GET    | `/api/users/:id` | Get single user |

Task Routes

| Method | Endpoint         | Description   |
| ------ | ---------------- | ------------- |
| POST   | `/api/tasks`     | Create task   |
| GET    | `/api/tasks`     | Get all tasks |
| PUT    | `/api/tasks/:id` | Update task   |
| DELETE | `/api/tasks/:id` | Delete task   |

🛡 Authentication
This project uses JWT for authentication.
Tokens:

Verify Token: For email/OTP verification

Access Token: Short-lived, for API access

Refresh Token: Long-lived, for renewing access token

📖 Learn More
Next.js Docs (https://nextjs.org/docs)
Sequelize Docs (https://sequelize.org/)
MySQL Docs (https://dev.mysql.com/doc/)
