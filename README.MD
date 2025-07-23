🎬 Movie Review Web App
This is a Node.js-based full-stack web application developed as part of the Databases and the Web module at Goldsmiths, University of London. The app allows users to register, log in, post and browse movie reviews, and search past games by teams, players, or location.

📦 Tech Stack
Backend: Node.js, Express.js

Templating Engine: EJS

Database: MySQL

Authentication: Session-based login using bcrypt for password hashing

🔐 Key Features
User registration and login with secure password hashing (bcrypt)

Session management for persistent login/logout

Home and About pages with navigation

Search functionality querying the MySQL database

Custom internal RESTful API to expose review data in JSON format

🚀 Getting Started
Clone this repo

bash
Copy
Edit
git clone https://github.com/your-username/movie-review-app.git
cd movie-review-app
Install dependencies

bash
Copy
Edit
npm install
Set up environment variables in a .env file

env
Copy
Edit
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=movie_reviews
SESSION_SECRET=your_session_secret
Start the application

bash
Copy
Edit
node index.js
Open your browser

arduino
Copy
Edit
http://localhost:8000
🗃️ Database
The app uses MySQL to store:

User details (hashed passwords)

Movie review content

Comment threads (optional)

Game search data (e.g. teams, scores, locations)

SQL setup scripts are included in the /db folder.

📄 Notes
A public API key was generated but not implemented in this version.

Application security includes password hashing, session management, and basic sanitisation.

The project is deployed to the Goldsmiths Virtual Server (or equivalent deployment).

📚 Documentation
Please refer to docs/final_documentation.pdf for the full write-up including:

Application outline

Architecture diagram

Data model

User functionality walkthrough

Security practices

Internal API usage

