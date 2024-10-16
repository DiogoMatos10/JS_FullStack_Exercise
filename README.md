# Project Documentation

## Table of Contents
- [Introduction](#introduction)
- [Project Structure](#project-structure)
- [Backend](#backend)
  - [Backend Technologies Used](#backend-technologies-used)
  - [Backend Files Description](#backend-files-description)
- [Frontend](#frontend)
  - [Backend Technologies Used](#backend-technologies-used)
  - [Frontend Files Description](#frontend-files-description)
- [Commands](#commands)
- [DataBase](#database)
  - [securities Table](#securities-table)
  - [prices Table](#prices-table)
- [Credits](#credits)x


## Introduction

This documentation provides a structured view of the project with step-by-step instructions on how to run both the backend and frontend.

This project consists of a **GraphQL API** as the backend and a **React.js** frontend application that displays data fetched from the API. The project is designed for displaying securities data including their prices, volume, and trends.




## Project Structure

```
+---backend
|   |   data (2)[37].json
|   |   package-lock.json
|   |   package.json
|   |   seed.ts
|   |   tsconfig.json
|   |   
|   \---src
|       |   db.ts
|       |   index.ts
|       |   
|       \---graphql
|           |   typeDefs.ts
|           |   
|           +---controllers
|           |       SecurityController.ts
|           |       
|           +---models
|           |       Price.ts
|           |       Security.ts
|           |       
|           +---resolvers
|           |       SecurityResolver.ts
|           |       
|           \---services
|                   SecurityServices.ts
|                   
\---frontend
    |   package-lock.json
    |   package.json
    |   
    +---public
    |       favicon.ico
    |       index.html
    |       
    \---src
        |   App.jsx
        |   index.css
        |   index.js
        |   
        \---components
                Footer.css
                Footer.jsx
                SecurityDetail.css
                SecurityDetail.jsx
                SecurityList.css
                SecurityList.jsx
                
```


## Backend

### Backend Technologies Used
- **Node.js**
- **TypeScript**
- **Apollo Server**
- **GraphQL**
- **PostgreSQL**
- **TS-Node**

### Backend Files Description

- **`package.json`**: Contains the backend project dependencies (like Apollo Server) and scripts to run the server.
- **`seed.ts`**: A TypeScript script that seeds the database with initial security data.
- **`tsconfig.json`**: Configuration file for TypeScript, defining how the TypeScript code is compiled.
- **`db.ts`**: Initializes the connection to the PostgreSQL database.
- **`index.ts`**: The entry point for the backend server. Sets up the Apollo Server and listens for incoming requests.
- **`typeDefs.ts`**: Defines the GraphQL schema for securities and prices.
- **`SecurityController.ts`**: Contains the main logic for fetching and processing security data.
- **`Price.ts` & `Security.ts`**: Models defining the structure of the `Price` and `Security` tables in the database.
- **`SecurityResolver.ts`**: GraphQL resolvers for fetching security data from the database.
- **`SecurityServices.ts`**: Interacts directly with the database to fetch security and price data.


## Frontend

### Frontend Technologies Used
- **React.js**
- **Material UI (MUI)**
- **Apollo Client**
- **Highcharts**

### Frontend Files Description

- **`package.json`**: Contains the frontend project dependencies (like React, Apollo Client, Highcharts) and scripts to run the client app.
- **`public/index.html`**: The HTML template that is used by React to mount the frontend application.
- **`App.jsx`**: The main component of the React application.
- **`index.js`**: The entry point that renders the React application into the DOM.
- **`Footer.jsx`**: A reusable footer component that is displayed on all pages.
- **`SecurityDetail.jsx`**: A page that displays detailed information for a specific security, including price and volume charts.
- **`SecurityList.jsx`**: A page that displays a list of securities in a table with sorting and pagination functionalities.


## Commands

### Backend

- **Install dependencies**:
    ```bash
    npm install
    ```

- **Run the development server**:
    ```bash
    npm start
    ```

- **Seed the database**:
    ```bash
    npx ts-node seed.ts
    ```

### Frontend

- **Install dependencies**:
    ```bash
    npm install
    ```

- **Run the development server**:
    ```bash
    npm start
    ```

### Database Connection
To connect to the PostgreSQL database, use the following command:

- **Run**:
    ```bash
    psql -U <username> -d <database_name>
    ```

Feel free to replace `<username>` and `<database_name>` with the appropriate values when you use the database connection command.


## Database

### Database Schema
This project uses **PostgreSQL** as its database management system. There are two primary tables: `prices` and `securities`. These tables are related, where each price entry in the `prices` table is linked to a security in the `securities` table through a foreign key.

### Database Tables

#### `securities` Table
The `securities` table stores information about each stock/security, including its ticker symbol, name, sector, country, and a trend based on historical data.

```sql
CREATE TABLE securities (
    id SERIAL PRIMARY KEY,
    ticker VARCHAR(20) NOT NULL,
    security_name VARCHAR(100) NOT NULL,
    sector VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    trend DOUBLE PRECISION NOT NULL
);
```
#### `prices` Table
The `prices` table stores information about the price and volume of each security over time, including the date, closing price, and trading volume.


```sql
CREATE TABLE prices (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    close NUMERIC NOT NULL,
    security_id INTEGER NOT NULL,
    volume INTEGER NOT NULL,
    CONSTRAINT fk_security FOREIGN KEY (security_id) REFERENCES securities (id) ON DELETE CASCADE
);

```


### Credits
This project was entirely developed and documented by Diogo Matos, at the request of Engine IA for their Code Challenge.












