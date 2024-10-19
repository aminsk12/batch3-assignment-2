# E-Commerce Express Application with TypeScript and MongoDB

## Overview

This project is an e-commerce API built with Express and TypeScript, integrating MongoDB for data management using Mongoose. The API provides endpoints for managing products and orders, ensuring data integrity through validation using Joi/Zod.

## Features

- **Product Management**: Create, retrieve, update, delete, and search products.
- **Order Management**: Create and retrieve orders.
- **Inventory Management**: Automatically update inventory when orders are placed.
- **Data Validation**: Joi/Zod validation for all incoming data.

## Technologies Used

- **Express**: Web framework for Node.js.
- **TypeScript**: Typed superset of JavaScript.
- **MongoDB**: NoSQL database.
- **Mongoose**: MongoDB object modeling for Node.js.
- **Joi/Zod**: Data validation libraries.

## Project Setup

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### Installation

1. Clone the repository
    ```bash
    git clone [https://github.com/your-username/ecommerce-api.git](https://github.com/aminsk12/batch3-assignment-2)
    cd lavel2-assignment2
    ```

2. Install dependencies
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory with the following content:
    ```
    MONGO_URI=your_mongodb_connection_string
    PORT=5000
    ```

4. Start the server
    ```bash
   npm run start:dev
    ```
5. To run lint
    ```bash
   npm run lint
    ```
6. Fix run lint
    ```bash
   npm run lint:fix
    ```