# Basic CRM

## Getting Started

These instructions will help you set up and run the backend server for the Basic CRM project.

### Prerequisites

Make sure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/) (version 14.x or higher)
- [npm](https://www.npmjs.com/) (version 6.x or higher)
- [Postgresql](https://www.postgresql.com/) (if you are using SQL as your database)
- [Flyway](https://flywaydb.org/) 

### Database Migrations with Flyway

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/basic-crm.git
   cd basic-crm
   ```
2. Install Flyway by following the instructions on the Flyway website.

3. Configure Flyway by creating or edit a `flyway.conf` file in the sql directory with the following content:
    ```conf
    flyway.locations=filesystem:./sql
    flyway.url=jdbc:postgresql://localhost:5432/crm_database
    flyway.user=user
    flyway.password=your-database-password
    ```
4. To run the migrations, use the following command:
    ```sh
    flyway migrate
    ```

## Backend
1. Go to backend directory
    ```sh
    cd backend
    ```
2. Install the dependencies
    ```sh
    npm install
    ```
#### Environment Variables
Make sure to set up the necessary environment variables. You can create a `.env` file in the root of the `backend` directory with the following content:
```sh
PORT=3000
DB_USER=user
DB_HOST=localhost
DB_DATABASE=crm_database
DB_PASSWORD=
DB_PORT=5432
JWT_SECRET=secret
NODE_ENV=dev
```
#### Running
To run the backend server in development mode, you can use the following command:

    ```sh
    npm run dev
    ```
This will start the server using nodemon, which will automatically restart the server whenever you make changes to the code.

#### Production

To run the backend server in production mode, you can use the following commands:
1. Build the project:
    ```sh
    npm run build
    ```
2. Start the server
    ```sh
    npm start
    ```

#### Testing
To run the tests, use the following command:

```sh
npm test
```

#### Linting
To run the linter, use the following command:

```sh
npm run lint
```

### API Documentation
The API documentation is available at `/api-docs` when the server is running. You can access it by navigating to `http://localhost:3000/api-docs` in your browser.

## Frontend

To run the frontend server in development mode, you can use the following command:
```sh
cd frontend
npm install
npm run dev
```

This will start the frontend server using Vite, which will provide fast and optimized development experience.

### Environment Variables
Make sure to set up the necessary environment variables. You can create a .env file in the root of the frontend directory with the following content:

```sh
VITE_API_URL=http://localhost:3000/api
```

### Production
To build the frontend for production, you can use the following commands:

```sh
npm run build
```

Preview the production build:

```sh
npm run preview
```

### Linting
To run the linter, use the following command:

```sh
npm run lint
```

### Testing
To run the tests, use the following command:
```sh
npm test
```

TODO:

Please consider that I didn’t have enough time to meet all the requirements, and here is the list of additional features I would have liked to add.

- Unit tests for React.js
- End to end tests with playwright
- Docker and docker compose