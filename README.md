# 📋 TaskManager

A role-based task management web application built with **Laravel**, **React**, **Inertia.js**, and **shadcn/ui**. Designed for teams where administrators manage and assign tasks, and users stay informed through real-time notifications.

---

## ✨ Features

### 👑 Admin

- Create, edit, and delete tasks
- Assign and reassign tasks to specific users
- Create new user accounts and set roles (Admin / User)
- Promote or demote user roles
- View all tasks across all users on the dashboard
- Manage archived tasks — restore or permanently delete
- Receive notifications when a user updates a task status

### 👤 User

- View only their assigned tasks
- Update the status of their assigned tasks (Pending → In Progress → Completed)
- Receive notifications when:
    - A new task is assigned to them
    - Their task is deleted by admin
    - Their task is reassigned to another user (with info on who it was reassigned to)
- Update their own profile (name, email, password, avatar)
- Personal dashboard showing their own task stats

### 🔔 Notifications

- Bell icon with unread count badge
- Mark individual notifications as read
- Mark all notifications as read at once

### 🗃️ Archive

- Deleted tasks move to archive (soft delete)
- Permanently deleted after 30 days automatically
- Admin can restore or reassign tasks from archive

### 🌗 Dark / Light Mode

- Per-user theme preference
- Persists across sessions

---

## 🛠️ Tech Stack

| Layer         | Technology                         |
| ------------- | ---------------------------------- |
| Backend       | Laravel 13 (PHP 8.4)               |
| Frontend      | React 18 + TypeScript              |
| Bridge        | Inertia.js                         |
| UI Components | shadcn/ui + Tailwind CSS           |
| Icons         | Lucide React                       |
| Database      | MySQL                              |
| File Storage  | Laravel Storage (public disk)      |
| Email         | Mailtrap (dev) / SMTP (production) |
| Deployment    | Railway                            |

---

## 🚀 Getting Started (Local)

### Prerequisites

- PHP 8.4+
- Composer
- Node.js 18+
- MySQL (XAMPP or any local setup)

### Installation

```bash
# Clone the repository
git clone https://github.com/bossRaf/laravel-react-task-manager
cd laravel-react-task-manager

# Install PHP dependencies
composer install

# Install Node dependencies
npm install

# Copy environment file
cp .env.example .env

# Generate app key
php artisan key:generate

# Configure your database in .env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=task_manager
DB_USERNAME=root
DB_PASSWORD=

# Run migrations and seed
php artisan migrate --seed

# Link storage
php artisan storage:link

# Start dev servers
composer run dev
```

### Default Accounts (after seeding)

| Role  | Email             | Password |
| ----- | ----------------- | -------- |
| Admin | admin@example.com | password |
| User  | user@example.com  | password |

---

---

## 🔐 Role & Permission Summary

| Feature                    | Admin | User |
| -------------------------- | ----- | ---- |
| View Dashboard (all tasks) | ✅    | ❌   |
| View Dashboard (own tasks) | ✅    | ✅   |
| Create Tasks               | ✅    | ❌   |
| Edit Tasks (full)          | ✅    | ❌   |
| Update Task Status         | ✅    | ✅   |
| Delete Tasks               | ✅    | ❌   |
| Assign / Reassign Tasks    | ✅    | ❌   |
| Manage Archive             | ✅    | ❌   |
| Manage Users               | ✅    | ❌   |
| Edit Own Profile           | ✅    | ✅   |

---

## 👨‍💻 Author

**Raff** — [@bossRaf](https://github.com/bossRaf)

> Built with ☕ and a lot of debugging sessions.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
