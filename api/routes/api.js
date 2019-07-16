const express = require('express')
const router = express.Router()
const ApiController = require('../controllers/api.controllers')
const querystring = require('querystring')
const url = require('url')

//======== For product route ==========
// get products
router.get('/products', ApiController.getProducts);
//create product
router.post('/products', ApiController.createProduct);
//get one product
router.get('/products/:id', ApiController.getProduct);
//update entirely product
router.put('/products/:id', ApiController.updateEntirelyProduct);
//update partially product
router.patch('/products/:id', ApiController.updatePartiallyProduct);
//delete product
router.delete('/products/:id', ApiController.deleteProduct);


//======== For user route ==========
// get users
router.get('/users', ApiController.getUsers);
//create user
router.post('/users', ApiController.createUser);
//get one user
router.get('/users/:id', ApiController.getUser);
//update entirely user
router.put('/users/:id', ApiController.updateEntirelyUser);
//update partially user
router.patch('/users/:id', ApiController.updatePartiallyUser);
//delete user
router.delete('/users/:id', ApiController.deleteUser);


//======== For category route ==========
// get categories
router.get('/categories', ApiController.getCategories);
//create category
router.post('/categories', ApiController.createCategory);
//get one category
router.get('/categories/:id', ApiController.getCategory);
//update entirely category
router.put('/categories/:id', ApiController.updateEntirelyCategory);
//update partially category
router.patch('/categories/:id', ApiController.updatePartiallyCategory);
//delete category
router.delete('/categories/:id', ApiController.deleteCategory);

module.exports = router
