# Social Media Microservices App

## Description
This project is a social media application built using a microservices architecture. It allows users to post updates and interact with posts through "likes".

Microservices have been created to manage posts, interact with them, and obtain user information, all developed with Express in Node.js. The frontend is built with React, and the microservices along with the PostgreSQL database are deployed in Docker containers.

## System Design Overview

The microservices architecture consists of two primary types of services: User Services and Post Services. The endpoints are structured according to these two core functionalities, ensuring a clear separation of concerns and modularity.

User Services (Authentication and Identity Management)

These services handle user authentication, registration, and identity management.
The Auth Service is responsible for registering users, managing login requests, and issuing JWT tokens for authentication.
This service interacts with the PostgreSQL database to store and retrieve user credentials securely.
Post Services (Content and Interaction Management)

These services manage the creation, retrieval, and interaction with posts.
The Posts Service handles fetching posts, ensuring users can browse available content.
The Likes Service manages post interactions by allowing users to like and unlike posts.
The Create Post Service enables users to submit new posts to the platform.
Separation of Concerns and Scalability
Each microservice is independently deployable, ensuring that the system can scale efficiently based on usage patterns.
Database interactions are handled through Prisma ORM, ensuring consistency across microservices.
The API Gateway (or frontend in this case) communicates with these services based on user authentication status, ensuring secure access to different functionalities.


-   Database design

    ![DB Design](/img/db_design.png)

- [Swagger design](/backend/docs/swagger.yml)

- [Users Management Microservice](/backend/microservices/users-mc/)

- [Posts Management Microservice](/backend/microservices/posts-mc/)


## Run

### Local

- Run microservices individually

```bash
cd <microservice folder> # check .env file based on .env example
npm install
npm run build
npm run prisma:generate # copy common prisma schema to create prisma client
npm run start # or npm run start:dev
```

- Run using Docker
```bash
docker-compose up -d --build # build the containers
cd frontend/social-media-app-frontend
npm run start # or npm run dev
# then go to http://localhost:3000 to check the web application
```

- Execute seeds
```bash
cd backend/microservices/users-mc
npm run prisma:seed # this should create some test users
```

### TEST USERS
```
username: alice
password: password
```
```
username: bob
password: password
```
```
username: charlie
password: password
```
```
username: megan
password: password
```
