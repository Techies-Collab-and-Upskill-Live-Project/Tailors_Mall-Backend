# Tailors Mall Backend

Tailors Mall is a platform built to connect tailors and clients, providing powerful tools for designers to showcase their portfolios, clients to search and filter designers, and both to engage in meaningful interactions.

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" height="50"/>
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express.js" height="50"/>
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" height="50"/>
  <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" alt="Redis" height="50"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" height="50"/>
  <img src="https://img.shields.io/badge/Cloudinary-FBBF24?style=for-the-badge&logo=cloudinary&logoColor=white" alt="Cloudinary" height="50"/>
</p>

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features
- **User Profiles**: Separate profiles for clients and designers.
- **Portfolio Display**: Tailors can create and showcase their designs and portfolios.
- **Search and Filter**: Clients can search for tailors and filter them based on their preferences.
- **Client-Tailor Interaction Tool**: Tools for communication and collaboration between clients and designers.
- **Authentication and Authorization**: Secure login and registration for both clients and tailors.
- **Real-Time Notifications**: Instant updates and notifications to keep users informed.
- **Booking System**: Clients can book services directly from tailors' profiles.
- **Rating and Reviews**: Clients can leave feedback on the services provided by tailors.
- **Secure Payments**: Integration with payment gateways for secure transactions.
- **Multilingual Support**: Support for multiple languages to cater to a global audience.

## Technologies Used
- **TypeScript**: Strongly typed programming language for scalable and maintainable code.
- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB**: NoSQL database for storing user data and portfolios.
- **Redis**: In-memory data structure store for caching and session management.
- **Cloudinary**: Image and video management for storing and displaying portfolios.
- **Axios**: Promise-based HTTP client for making requests to APIs.
- **Multer**: Middleware for handling multipart/form-data, used for file uploads.
- **JWT (JSON Web Tokens)**: For authentication and secure data transmission.
- **Nodemailer**: For sending emails such as notifications and verification links.

## Project Structure
```plaintext
Tailors_Mall-Backend/
├── package.json
├── package-lock.json
├── src/
│   ├── constants/
│   ├── core/
│   ├── files/
│   │   ├── admin/
│   │   ├── auth/
│   │   ├── user/
│   ├── templates/
│   ├── utils/
│   ├── validations/
│   └── index.ts
└── tsconfig.json
```
 
## Project Structure
- **constants/**: Contains constants like status codes.
- **core/**: Core functionality including app configuration, database setup, and server initialization.
- **files/**: Contains modules for admin, authentication, and user (clients/designers) features.
- **templates/**: Email templates for various notifications.
- **utils/**: Utility functions for handling Redis, email, cloud storage, etc.
- **validations/**: Validation schemas for user input.

## Installation
1. Clone the repository:

    ```bash
    git clone https://github.com/Techies-Collab-and-Upskill-Live-Project/Tailors_Mall-Backend.git
    ```

2. Navigate to the project directory:

    ```bash
    cd Tailors_Mall-Backend
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Create a `.env` file based on the `.env.example` and update the environment variables.

5. Start the development server:

    ```bash
    npm run dev
    ```

## Usage
- **Authentication**: Secure login and registration using JWT.
- **Portfolio Management**: Designers can upload their designs using Cloudinary.
- **Client-Tailor Interaction**: Clients can send requests to tailors, and tailors can respond to them.
- **Real-Time Notifications**: Stay updated with instant notifications about bookings, messages, and more.

## API Documentation
Detailed API documentation is available in the `docs/` folder or through the Postman collection link [here](#).

## Contributing
Contributions are welcome! Follow the steps below to contribute:

1. Fork the repository.
2. Create a new feature branch:

    ```bash
    git checkout -b feature-name
    ```

3. Commit your changes:

    ```bash
    git commit -m 'Add some feature'
    ```

4. Push to the branch:

    ```bash
    git push origin feature-name
    ```

5. Open a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact
Remember to keep this README updated as the project evolves. If you have any questions or need help, don't hesitate to reach out to me or post on the Devs WhatsApp group. Let's build an amazing project together! 😄 🚀 🔥

Happy coding!
