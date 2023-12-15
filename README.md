# MERN Stack Notes Application with Firebase Authentication
## Overview
This MERN (MongoDB, Express.js, React.js, Node.js) stack application is a simple notes management system that allows users to create, view, and delete notes. Additionally, it integrates Firebase Authentication for user registration and login. Users can securely authenticate and manage their notes.
## Features
- User Authentication: Firebase Authentication provides a secure and reliable user authentication system. Users can register, log in, and log out.
- CRUD Operations: The application supports basic CRUD (Create, Read, Update, Delete) operations for managing notes. Users can create new notes, view their existing notes, update note content, and delete individual notes or multiple notes at once.
- Real-time Updates: MongoDB's real-time capabilities ensure that the notes are updated in real-time across all connected clients. When a user adds or deletes a note, the changes are immediately reflected in the user interface.

## Technologies Used
MongoDB: A NoSQL database used to store and retrieve notes data.
Express.js: A backend framework for building the RESTful API.
React.js: A front-end library for building the user interface.
Node.js: A server-side JavaScript runtime environment.
Firebase Authentication: Provides secure user authentication.

## Getting Started
### Clone the Repository: Clone the repository to your local machine using the following command:
  - git clone [https://github.com/your-username/mern-stack-notes-app.git](https://github.com/dhyey0011/CS641-Final.git)
### Install Dependencies: Navigate to the project directory and install the required dependencies for both the server and client:
  - cd mern-stack-notes-app
  - npm install
  - cd client
  - npm install
###  Set Up Firebase Project:

Create a Firebase project on the Firebase Console.
Obtain your Firebase configuration (apiKey, authDomain, projectId, etc.) and replace the placeholders in the client/src/firebase.js file.
Set Up MongoDB Atlas:
Create a MongoDB Atlas account and set up a cluster.
Obtain your MongoDB connection string and replace the placeholder in the server/config/db.js file.
Run the Application:
Start the server: cd server
Start the client: npm start

cd client
npm start
The application should be accessible at http://localhost:3000.

## Usage
### Authentication:
  - Register a new account or log in with existing credentials.
### Notes Management:
  - Create a new note by entering a title and content.
  - View all existing notes.
  - Update a note's content.
  - Delete individual notes or multiple notes at once.
  - Contributing
  - Feel free to contribute to the project by opening issues or submitting pull requests.

License
This project is licensed under the MIT License - see the LICENSE file for details.
