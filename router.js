var express = require('express');
var router = express.Router();
const mongoose = require("mongoose")

// connect db
async function connect() {
    try {
        await mongoose.connect("mongodb://localhost:27017/ProductList", {
            useCreateIndex: true,
            useNewUrlParser: true,
        });
        console.log('connect success DB');
    } catch (error) {
        console.log('connect fail DB');
    }
}
connect();

const Schema = mongoose.Schema;
const product = new Schema({
    product_id: String,
    product_name: String,
    price: String,
    quantity: String,
})
const model = mongoose.model("product", product);

// fetch all element array 
function fetchProduct(item) {
    return item.map(item => item.toObject())
}
// fetch one element array
function findProduct(item) {
    return item ? item.toObject() : item;
}

// GET
// find
router.get("/", function (req, res) {
    model.find().then((items) => {
        res.json(fetchProduct(items))
    }).catch((err) => console.log(err))
})
// findOne
router.get("/:productID", function (req, res) {
    model.findOne({ productID: req.params.productID }).then((items) => {
        res.json(findProduct(items))
    }).catch((err) => {
        console.log(err);
    })
})
//export this router to use in our index.js
module.exports = router;