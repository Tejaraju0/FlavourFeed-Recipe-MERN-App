[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge)](https://github.com/Tejaraju0/FlavourFeed-Recipe-MERN-App)  
# FlavourFeed

**Discover, share, and explore a world of culinary delights. FlavourFeed is a platform where food enthusiasts can find, create, and share recipes from diverse cultures and cuisines.**

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Future Enhancements](#future-enhancements)
- [Contact](#contact)

---

## About the Project

FlavourFeed is a comprehensive web application built to cater to the diverse culinary interests of users worldwide. With an extensive recipe database, robust search, and vibrant community features, FlavourFeed empowers users to explore a variety of cuisines, share recipes, and connect with other food lovers.

## Features

- **Extensive Recipe Database**: A vast collection of recipes from various cuisines, regions, and dietary preferences.
- **Recipe Search and Filtering**: Advanced search and filters by ingredients, cuisines, dietary needs, etc.
- **Recipe Submission and Sharing**: Users can submit, share, and download recipes in PDF format.
- **User Profiles**: Create profiles, save favorite recipes, and interact with the community.
- **Community Interaction**: Users can like, comment on, and rate recipes to foster engagement.
- **Responsive Design**: A mobile-friendly interface for ease of use on any device.

---

## Technologies Used

- **Frontend**: React.js, Bootstrap, HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas (NoSQL)
- **Authentication**: JSON Web Tokens (JWT), bcrypt.js for password hashing
- **Others**: Axios for HTTP requests, Multer for image uploads, react-icons, react-share

---

## Installation

Follow these steps to set up and run FlavourFeed locally:

### Prerequisites

- **Node.js** and **MongoDB** (or MongoDB Atlas for cloud-based database).

### Setup

1. **Clone the Repository**:

   ```bash
   https://github.com/Tejaraju0/FavourFeed--Recipe_app-MERN-Project-.git
   cd FlavourFeed
   ```

2. **Backend Setup**:
   - Navigate to the `server` folder:

     ```bash
     cd server
     ```

   - Install dependencies:

     ```bash
     npm install
     ```

   - Create a `.env` file and set up environment variables:

     ```plaintext
     MONGO_URI=your-mongodb-connection-string
     PORT=8000
     JWT_SECRET=your-jwt-secret
     ```

   - Start the server:

     ```bash
     npm run start
     ```

3. **Frontend Setup**:
   - Navigate to the `client` folder:

     ```bash
     cd ../client
     ```

   - Install dependencies:

     ```bash
     npm install
     ```

   - Start the frontend server:

     ```bash
     npm start
     ```

---

## Usage

1. Access the frontend at `http://localhost:3000` and the backend at `http://localhost:8000`.
2. **Register or log in** to create an account.
3. **Explore recipes** by cuisine, dietary preference, or ingredient.
4. **Submit and share recipes** or save them to your profile.
5. **Download recipes** as PDFs for offline use.

---

## Project Structure

```plaintext
FlavourFeed/
├── client/              # Frontend code (React.js)
│   ├── public/
│   └── src/
├── server/              # Backend code (Node.js, Express.js, MongoDB)
│   ├── controllers/
│   ├── models/
│   └── routes/
├── .gitignore
└── README.md
```

---

## Testing

Testing is conducted through both manual and automated tests to ensure feature reliability and usability.

### Test Cases

- **User Authentication**: Verifies login, registration, and error handling for invalid credentials.
- **Recipe Search**: Tests search functionality for accuracy and error handling.
- **Recipe Submission**: Checks for required fields, image uploads, and proper error handling.
- **User Interaction**: Tests features like recipe sharing, commenting, and liking.

---

## Future Enhancements

- **Recipe Videos**: Adding video tutorials within recipes.
- **Advanced Filters**: Additional filters like dietary restrictions and difficulty level.
- **Localization**: Support for multiple languages to cater to a global audience.
- **User-Driven Ratings**: A rating system to enhance recipe selection.

---

## Contact

Developed by **Sangaraju Hima Teja Raju**  
[LinkedIn](https://linkedin.com/in/teja-raju)  
[Email](mailto:sangarajutejaraju@gmail.com)

---
