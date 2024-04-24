# Project Title: Calendify (Appoitment Scheduler Web Application)

## Description
Calendify is a appointment scheduling web application designed to streamline and simplify the process of managing appointments efficiently. Built upon robust technologies like Spring Boot, Spring Security, and Spring Data JPA, Calendify ensures seamless data management and secure user authentication. With a dynamic frontend powered by ReactJS, Redux Toolkit, and Material UI, users experience an intuitive interface for scheduling and managing appointments effortlessly. Integration with Spring Email and RabbitMQ facilitates real-time notifications and communication, enhancing user engagement. Backed by MySQL for reliable data storage, Calendify promises reliability, scalability, and a seamless experience for users.

## Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [Technologies Used](#technologies-used)
4. [Folder Structure](#folder-structure)
5. [Features](#features)
6. [Deployement](#deployment)
7. [Troubleshooting](#troubleshooting)
8. [Contact Information](#contact-information)
9. [Acknowledgments](#acknowledgments)

## Installation
1. Clone the repository: `git https://github.com/somnathnavale/Appointment-Scheduler.git`
2. Navigate to the project folder: `cd Appointment-Scheduler`
3. Install dependencies:
   - Frontend: `cd client && npm install`
   - Backend: reload pom.xml file
4. Set up environment variables:
   - Create a `application.yml` file in the `Appointment Scheduler\server\src\main\resources` directory with the necessary variables (see `application.example.yml` for reference).
   - server `application.yml` file, for email and password - add your email address and to create password -> go to google account -> select security option -> select 2-Step verification -> scroll down and select app password option -> create app and password will be auto generated, use that password
   - server `application.yml` file, update RabbitMQ with credentials, before that you need to install RabbitMQ locally or you can use docker to run RabbitMQ locally, i would suggest use docker.
   - server `application.yml` file, update your database credentials and jwt secret.

## Usage
1. Start the backend server: Open application in IDE ( Intellij or STS or Eclipse) to start
3. In a separate terminal, start the frontend: `cd client && npm run dev`
4. Open your browser and navigate to `http://127.0.0.1:5173/` to use the application.

## Technologies Used
- Frontend: React, Redux-Toolkit, Material UI
- Backend: Java, Spring Boot, Spring DataJPA
- Database: MySQL
- Authentication: Spring Security, JWT
- Email Notifications - Java Mail Sender
- Messaging Brocker - RabbitMQ 

## Folder Structure
- `/client`: Frontend codebase
- `/server`: Backend codebase

## Features
1. User authentication and authorization
2. Create, edit, and delete appointment
3. User profile management
4. Email notifications and reminders

## Deployment
   Soon be updated.
      
## Troubleshooting
- If you encounter issues with authentication, ensure that your environment variables are correctly set.

## Contact Information
For questions or feedback, connect with me on [Linkedin](https://www.linkedin.com/in/somnathnavale/)

## Acknowledgments

### NPM Package Used 
### Maven Package Used 

1. Front-End
    - @emotion/react,
    - @emotion/styled
    - @mui/icons-material
    - @mui/material
    - @mui/x-date-pickers
    - @reduxjs/toolkit
    - axios
    - dayjs,
    - moment
    - react
    - react-big-calendar
    - react-dom
    - react-redux
    - react-router-dom

2. Back-End 
    - Spring Boot Starter Data JPA  
    - Spring Boot Starter Security  
    - Spring Boot Starter Validation  
    - Spring Boot Starter Web  
    - MySQL Connector/J  
    - jjwt-api  
    - jjwt-impl
    - jjwt-jackson
    - Spring Boot Starter AMQP
    - Spring Boot Starter Mail  
    - Spring Boot Starter Thymeleaf 
    - Spring Boot Starter Test
    - Spring Security Test
    - ModelMapper

