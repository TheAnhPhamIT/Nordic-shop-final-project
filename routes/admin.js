const express = require('express')
const router = express.Router()
const Admincontroller = require('../controllers/admin.controllers')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
   
const upload = multer({ storage: storage })

//get total page
router.get('', Admincontroller.getAdminPage)

router.get('/products', Admincontroller.getProductsPage)
router.get('/categories', Admincontroller.getCategoriesPage)
router.get('/users', Admincontroller.getUsersPage)

//get create product page
router.get('/products/create', Admincontroller.getProductCreatePage)
router.post('/products/add-product',upload.single('image'), Admincontroller.createNewProduct)

//delete product
router.get('/products/delete/:id',Admincontroller.deleteProduct)

//update product
router.post('/products/:id', Admincontroller.updateProduct)
//get detail page
router.get('/products/:id', Admincontroller.getProductDetails)
router.get('/users/:id', Admincontroller.getUserDetails)
//log out page
router.get('/logout', Admincontroller.logout)

module.exports = router
