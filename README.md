# Assignment for Full Stack Internship - TRIKL

APIs to manage product.
implemented RESTful APIs for CRUD operations.
For the database MongoDB is used
For API documentation Swagger is used

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed.
- MongoDB atlas setup configured.
- Git installed.
- Postman or a similar tool for API testing.

## Getting Started

To get a local copy up and running, follow these steps:

1. Clone the repository:
```
 git clone https://github.com/satyam-9/TRIKL-assisment.git
```
  
   

2. Change to the project directory:

   ``` 
   cd your-repo
   ```

3. Install project dependencies:

    ```
    npm install
    ```

4. Create a .env file in the project root and configure your MongoDB connection URI:

    MONGODB_URI=your-mongodb-connection-uri

5. Start the Node.js server:

```    
npm start
```
The server will start running on 'http://localhost:3000'

# Usage
Use Postman or a similar tool to interact with the API endpoints:
- GET /items: Fetch all items.
- POST /items: Create a new item.
- PUT /items/:id: Update an existing item.
- DELETE /items/:id: Delete an item.

## Swagger Documentation
You can access the Swagger API documentation by visiting http://localhost:3000/api-docs after starting the server.



