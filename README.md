# Car Passion Network

**Car Passion Network** is a social network designed for car enthusiasts. Users can connect with like-minded individuals, share posts about their favorite cars, comment on others' posts, and engage in discussions. This project is built using **React** for the frontend, **Spring Boot** for the backend, and **PostgreSQL** for the database.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Future Enhancements](#future-enhancements)

## Features

- **User Authentication**: Secure signup and login with JWT-based authentication.
- **Feed Page**: Centralized feed displaying posts from all users on the dashboard.
- **User Profile**: Each user has a profile page showcasing personal information, a profile image, and a wall for posts.
- **Post Creation & Interaction**:
    - Create, edit, and delete posts with a title, content, likes, and comments.
    - Reply to comments, like, edit, or delete comments.
- **Friend System**: Add users as friends and view them in a dedicated "Friends" section on your profile.
- **User Search**: Search for other users by name to connect and follow.
- **Enhanced Settings**: Customize account settings and personalize user experience.
- **Comment Management**: Edit and delete comments on posts.
- **Profile Image Upload**: Upload and update profile images directly from the profile page.


## Technologies Used

- **Frontend**: 
  - [React](https://reactjs.org/): A JavaScript library for building user interfaces.
  - **CSS** for styling.
- **Backend**: 
  - [Spring Boot](https://spring.io/projects/spring-boot): A framework for building Java-based applications.
  - Spring Security for authentication and authorization.
  - JPA (Java Persistence API): For managing and accessing data in the database.
  - Maven: A build automation tool for managing project dependencies and build processes.
- **Database**: 
  - [PostgreSQL](https://www.postgresql.org/): A powerful, open-source object-relational database system.
- **API**: 
  - RESTful API developed using Spring Boot.
- **Containerization (for Database and Testing)**: 
  - [Docker](https://www.docker.com/): Used to run PostgreSQL in a container and manage test environments during development.
- **Other Tools**:
  - JWT for secure user authentication.

## Installation

### Prerequisites

Before you begin, ensure you have the following installed:

#### Backend
- Java 17
- Maven
- IntelliJ IDEA (or any preferred IDE)
- Docker

#### Frontend
- [Node.js](https://nodejs.org/en) 
- npm

### Backend Setup (Spring Boot)

1. Clone the repository:
   ```bash
   git clone https://github.com/LuboKar/car-passion-network.git
   cd car-passion-network-api
   ```
2. Start DB.
   ```bash
   run docker-compose up
   ```

3. Build and run the backend:
   ```bash
   ./mvn clean install
   ```

### Frontend Setup (React)

1. Navigate to the frontend directory:
   ```bash
   cd car-passion-network-ui
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

The frontend should now be running at `http://localhost:3000` and the backend at `http://localhost:8080`.

## Usage

1. Open the browser and navigate to `http://localhost:3000`.
2. Register a new account or login with an existing account.
3. Once logged in, you will be redirected to the **Dashboard** where you can:
   - View posts from all users.
   - Like and comment on posts.
   - Navigate to your **Profile** to view your posts or update personal information.

## Future Enhancements

Some features that could be added in the future:
- **Groups and Events**: Users can create and join car-related groups and events.
- **Notifications**: Notifications for user interactions and updates.

This version emphasizes that the list is a starting point and may grow as you continue to develop the project.