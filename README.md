A MERN stack application where analytics of teachers are shown on a dashborad with graphs.

---

## 🚀 Features

- Analtics of teachers, lessons, quiz and assesmnets given
- Each teacher analysis
- Weekly graph analysis
- RESTful APIs
- Tailwind 
---

# Architecture Decisons
- Database design: Used seperate teachers and activities collections keeping in mind the normalization principle and also that activities will grow overtime and it will be easier to run aggregations on a seperate collection
- Compound Unique Index for Duplicate Prevention
- Using aggregation based analytics because it avoids full data retrieval and efficient server side computation

## 🏗️ Tech Stack

| Layer         | Technology                |
| ------------- | ------------------------- |
| Frontend      | React (Vite + TypeScript) |
| Backend       | Node.js + Express         |
| Database      | MongoDB (Mongoose)        |
| Styling       | Tailwind CSS              |
| Client-Server | Axios                     |

---

## ⚙️ Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/savra.git
cd server
```

### 2. Backend Setup

```bash
cd server
npm install
```

#### Create .env

```bash
DATABASE_URL=database_url

```

#### Run Server

```bash
npm run dev
```

---

### 3. Frontend Setup

```bash
cd ../client
npm install
```

#### Run Frontend

```bash
npm run dev
```

---
