# 📦 Shop Inventory Management System

A full-stack web application built from scratch to solve a real-world business problem during my summer job. 
The system was designed to streamline daily inventory tracking in a retail shop, 
helping to quickly manage stock levels across different product variants and efficiently plan future orders.

## 🛠 Tech Stack
* **Frontend:** React, MUI (Joy UI)
* **Backend:** Node.js, Express.js
* **Database:** JSON (Lightweight file-based database)

## 📸 Preview
<img width="1455" height="754" alt="Zrzut ekranu 2026-04-22 o 02 00 32" src="https://github.com/user-attachments/assets/c58278d5-9ed0-491c-8269-20a0cce717ef" />


## ✨ Key Features
* **Real-World Utility:** Built for and successfully utilized in a real retail environment during the shop's operational season.
* **Variant Management:** Handling complex product data structures, including specific clothing sizes (adults and kids).
* **Rapid Stocktaking:** Intuitive interface with quick +/- controls to adjust inventory numbers on the fly.
* **Live Filtering:** Instant search functionality to quickly locate specific items in the database.
* **CRUD Operations:** Full capability to add new products and update existing stock seamlessly.

## 💡 Potential Enhancements
While the application successfully fulfilled its purpose during the shop's operational period, I designed the architecture with scalability in mind. 
If the project were to be expanded, the next logical business features would include:

* **Automated Low-Stock Alerts:** Visual indicators for items dropping below a specific threshold to streamline the reordering process.
* **Monthly Sales Reports:** Automated summaries showing exact unit sales over specific timeframes.
* **Database Migration:** Upgrading from the lightweight JSON file to a robust relational database (e.g., PostgreSQL) to handle larger datasets and multiple users.

## 💻 How to Run Locally
This project uses a decoupled architecture with a separate frontend and backend. You will need to run them simultaneously in two different terminal windows.

**1. Start the Backend Server:**
1. Navigate to the server folder: `cd server`
2. Install dependencies: `npm install`
3. Start the Express server: `node server.js`

**2. Start the Frontend Application:**
1. Open a new terminal window.
2. Navigate to the client folder: `cd client`
3. Install dependencies: `npm install`
4. Create a new file named `.env` in the root of the client folder and paste this inside: `VITE_API_URL=http://localhost:3001`
5. Start the Vite development server: `npm run dev`
