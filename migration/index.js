const mongoose = require('mongoose')

//const { MONGO_URI = 'mongodb://localhost:27017/nordic-shop' } = process.env
const { MONGO_URI = 'mongodb+srv://admin:admin@12345678@nordic-shop-demo-agmy0.mongodb.net/nordic-shop?retryWrites=true&w=majority'} = process.env

const Product = require('../models/product')
const products = require('../data/products.json')

const Category = require('../models/category')
const categories = require('../data/categories.json')

const User = require('../models/user')
const users = require('../data/users.json')

mongoose
  .connect(MONGO_URI, { useNewUrlParser:true})
  .then(() => {
    let newProducts = products.body.map(product => {
      delete product.id
      return {
        ...product,
        _id: new mongoose.mongo.ObjectId(),
      }
    })

    console.log(newProducts)
    return Product.insertMany(newProducts)
  })
  .then(() => {
    return Category.insertMany(categories.body)
  })
  .then(() => {
    return User.insertMany(users.body)
  })
  .then(() => {
    process.exit(0)
  })
  .catch(err => {
    console.log(err)
  })
