🛍️ eCart Frontend (React + EmailJS + TailwindCSS)

This is a fully responsive e-commerce frontend built with React.js, featuring:

✔ User authentication UI
✔ Product listing & cart management (UI only)
✔ Responsive design using TailwindCSS
✔ Order confirmation email using EmailJS
✔ Checkout page with COD / Online payment UI

📦 Tech Stack
Technology	Purpose
React.js	Frontend UI
React Router DOM	Routing
Axios	API integration
EmailJS	Sending confirmation emails
Tailwind CSS	Styling & responsive design

🚀 Installation & Setup
1️⃣ Clone the repository
git clone :https://github.com/GaneshDGiri/ECART_2.git
cd ecart-frontend

2️⃣ Install required dependencies
npm install react react-dom axios

For EmailJS:
npm install @emailjs/browser

For React Router (if applicable):
npm install react-router-dom

Install TailwindCSS:
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

🎨 Configure TailwindCSS

Update tailwind.config.js:

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}


Add Tailwind directives to src/index.css:
@tailwind base;
@tailwind components;
@tailwind utilities;

📧 EmailJS Setup

Ceate an account at emailjs.com
Create an email service
Create an email template

Get the following keys:
Service ID
Template ID
Public Key

▶️ Run Project
npm run dev


Project will start at:

http://localhost:5173/

📁 Folder Structure
/src
 ├── components
 ├── assets
 ├── context
 ├── App.jsx
 ├── index.js
 └── styles


🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to modify.

📜 License
This project is Open Source and free to use.
