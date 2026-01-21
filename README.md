# Local Network Web App (GitHub Pages + Node.js)

This project demonstrates a simple setup where:

- A **static frontend** is hosted on **GitHub Pages**
- A **Node.js / Express backend** runs on a **local machine**
- The frontend communicates with the backend using `fetch()` and CORS

This setup is intended for **local network usage and development**.


## 📁 Project Structure

.
├── frontend/ # Static site (GitHub Pages)
│ └── index.html
├── backend/ # Node.js / Express API
│ ├── server.js
│ ├── package.json
│ └── node_modules/ (ignored)
├── .gitignore
└── README.md





## 🚀 How to Run Locally

### 1️⃣ Start the backend server
bash
cd backend
npm install
node server.js


Server runs at:
http://localhost:5000


2️⃣ Start the frontend
cd frontend
npx serve .

Open:
http://localhost:3000