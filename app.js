require("dotenv").config();  

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();

const port = process.env.PORT || 3000;

//swagger doc

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Item API",
            version: "1.0.0",
            description: "API for managing items",
        },
    },
    apis: ["./routes/items.js"],
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));


//swagger doc end-----------------


mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "trikl",
}).then(()=>{
    console.log('Database Connection is ready...')
})
.catch((err)=> {
    console.log(err);  
}) 

app.use(bodyParser.json());

// API routes
const itemsRouter = require('./routes/items');
app.use('/', itemsRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
