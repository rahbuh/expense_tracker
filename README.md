# Expense Tracker

_A web app to record misc expenses using React, Node and MongoDB._

View live on Heroku <a href="https://expense-tracker-0320.herokuapp.com/" target="_blank">HERE</a>.

<img src="./readme-images/screenshot1.jpg" width="572">
<img src="./readme-images/screenshot2.jpg" width="572">

## Summary

Expense Tracker is a single page application (SPA) that allows the user to keep track of misc expenses. They can log in and record where, when and how much was spent. The user can also record a category, what method of payment was used, and a short memo.

This project was my first experience with using MongoDB as a database. I really enjoyed working it. It was also my first time implementing user registration and login. I created my own in order to gain a better understanding of all the parts involved in authentication. (I will probably use a framework next time.) Since MongoDB makes implementing the database rather simple, most of the challenges I faced were in the front end with React. Managing persistent login state and protected routes became quite a challenge. Although my solution may not be the greatest, I learned a lot and will be trying alternate solutions on my next projects.

<img src="./readme-images/javascript.svg" width="50">&nbsp;&nbsp;
<img src="./readme-images/mongodb.png" width="50">&nbsp;&nbsp;
<img src="./readme-images/react.svg" width="50">&nbsp;&nbsp;
<img src="./readme-images/node.png" width="60">&nbsp;&nbsp;
<img src="./readme-images/postman.svg" width="50">&nbsp;&nbsp;
<img src="./readme-images/heroku.svg" width="40">

### Technical

- Front End (JavaScript)
  - React (main SPA)
  - Axios (HTTP requests)
- Back End (Node)
  - Express (Serving static site, internal API endpoints)
  - BCrypt (Password encryption)
  - JSON Web Tokens (User Authentication)
- Database (MongoDB)
- Hosts
  - Heroku

### Prerequisites

- Expense Tracker requires a MongoDB database. You will need to install MongoDB locally, or create a free Atlas cloud database at <a href="https://www.mongodb.com/" target="_blank">https://www.mongodb.com/</a>.
- The path to connect to your MongoDB database will need to be added to the `.env.sample` file located in the root folder. Replace the empty quotes next to `MONGODB_URI=` with the path to your database.
- You will also need to add a secret to the `.env.sample` file for creating the JSON web tokens for authentication. Replace the empty quotes next to `JWTSECRET=` with a random string (16 characters min).
- Once both the MongoDB path and JWT secret have been added, save and rename `.env.sample` to `.env`

You need to have node/npm installed on your machine to run the app locally. To install node, go to <a href="https://nodejs.org/" target="_blank">https://nodejs.org/</a>.

### Install

- From the root directory, run: `npm install`
- cd into /client and run: `npm install`
- Once installed, to start the application, from the root directory run: `npm run watch`
- Open your browser and connect to http://localhost:5000/

### Resources Used

- <a href="https://www.udemy.com/modern-react-front-to-back/" target="_blank">Udemy - React Front To Back 2019 by Brad Traversy</a>
- <a href="https://scrimba.com/g/greact" target="_blank">Scrimba - React Bootcamp</a>
- <a href="https://youtu.be/kQKs7o-X0zc" target="_blank">YouTube - React Hooks - Local Storage State (
  by Web Dev Profesh)</a>

## Author

Rob Kramer, Web Developer
[GitHub](https://github.com/rahbuh)
[LinkedIn](https://www.linkedin.com/in/robertnkramer/)
