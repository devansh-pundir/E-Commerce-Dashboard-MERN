//  Packages
//  Express 
//  Nodemon 
//  Mongoose
//  Cors
//  JWT

// Exporting Database Files
require("./Database/config")
const userModel = require("./Database/users")
const productModel = require("./Database/product")

const express = require("express")
const cors = require("cors")
const JWT = require("jsonwebtoken")

const app = express();
app.use(express.json())
app.use(cors())

const JWTKEY = "e-comm"

// POST Register
app.post("/register", async (req, res) => {
    let user = new userModel(req.body)
    let result = await user.save();
    result = result.toObject();
    delete result.password
    JWT.sign({ result }, JWTKEY, { expiresIn: "2h" }, (err, token) => {
        if (err) {
            res.send({ result: "Something went wrong. Please try after some time." })
        }
        res.send({ result, auth: token })
    })
})

// POST Log In
app.post("/login", async (req, res) => {
    if (req.body.mail && req.body.password) {
        let user = await userModel.findOne(req.body).select("-password")
        if (user) {
            JWT.sign({ user }, JWTKEY, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    res.send({ result: "Something went wrong. Please try after some time." })
                }
                res.send({ user, auth: token })
            })
        } else {
            res.send({ result: "No User Found" })
        }
    } else {
        res.send({ result: "No User Found" })
    }
})

// POST Add Product
app.post("/add-product", async (req, res) => {
    let product = new productModel(req.body)
    let result = await product.save();
    console.log(result)
    res.send(result)
})

// Product Listing API
app.get("/products", verifyToken, async (req, res) => {
    let products = await productModel.find()
    if (products.length > 0) {
        res.send(products)
    } else {
        res.send({ result: "No Products Found" })
    }
})

// Delete Product API
app.delete("/delete/:id", async (req, res) => {
    const result = await productModel.deleteOne({ _id: req.params.id })
    res.send(result)
})

// API To Get Single Project
app.get("/product/:id", async (req, res) => {
    let result = await productModel.findOne({ _id: req.params.id })
    if (result) {
        res.send(result)
    } else {
        res.send({ result: "No Products Found" })
    }
})

// API to Update Product
app.put("/update/:id", async (req, res) => {
    let result = await productModel.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
    res.send(result)
})

// Search API
app.get("/search/:key", verifyToken, async (req, res) => {
    console.log(req.params.key)
    let result = await productModel.find(
        {
            "$or": [
                {
                    "name": { $regex: req.params.key },
                    "price": { $regex: req.params.key },
                    "category": { $regex: req.params.key },
                    "company": { $regex: req.params.key }
                }
            ]
        }
    );
    res.send(result)
})

function verifyToken(req, res, next) {
    let token = req.headers['authorization']
    if (token) {
        token = token.split(" ")[1]
        console.log("Middleware Called!", token)
        JWT.verify(token, JWTKEY, (err, valid) => {
            if (err) {
                res.send("Please add valid token")
            } else {
                next();
            }
        })
    } else {
        res.send("Please add token with header")
    }
}

// Server Call
app.listen(5000)