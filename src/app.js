const fs = require("fs");
const express = require("express");
const app = express();

// Importing products from products.json file
const products = JSON.parse(fs.readFileSync(`${__dirname}/data/products.json`));

// Middlewares
app.use(express.json());

// Write GET endpoint for sending product to the client here
// Endpoint - /api/v1/products/:name/:price
app.get('/api/v1/products/:name/:price', (req, res) => {
    let {name, price} = req.params;
    price = parseInt(price);

    const product = products.find((productEntry) => 
        productEntry.price === price && productEntry.name === name
    )
    if(!product){
        return res.status(404).json({message: 'Product not found!', status: 'failed'})
    }
    res.status(200).json({
        status: "success",
        message: "Product fetched successfully",
        data: {
            product
        }
    })
})

module.exports = app;
