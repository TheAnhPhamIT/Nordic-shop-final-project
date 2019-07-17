const productModel = require('../models/product')
const categoryModel = require('../models/category')
const userModel = require('../models/user')

exports.getAdminPage = (req, res) => {
  if (req.session.authenticated) {
    const promiseCountProduct = productModel.count()
    const promiseCountCategory = categoryModel.count()
    const promiseCountUser = userModel.count()

    Promise.all([
      promiseCountProduct,
      promiseCountCategory,
      promiseCountUser,
    ]).then(results => {
      const [productCount, categoryCount, userCount] = results
      res.render('admin', {
        productsTotal: productCount,
        categoriesTotal: categoryCount,
        usersTotal: userCount,
        ordersTotal: 0,
        userName: req.session.name,
        userAvatar: req.session.avatar,
      })
    })
  } else {
    res.redirect('/')
  }
}

exports.getProductsPage = (req, res) => {
  if (req.session.authenticated) {
    productModel.find().then(products => {
      res.render('products', {
        products: products,
        userName: req.session.name,
        userAvatar: req.session.avatar,
      })
    })
  } else {
    res.redirect('/')
  }
}

exports.getCategoriesPage = (req, res) => {
  if (req.session.authenticated) {
    categoryModel.find().then(categories => {
      res.render('categories', {
        categories: categories,
        userName: req.session.name,
        userAvatar: req.session.avatar,
      })
    })
  } else {
    res.redirect('/')
  }
}

exports.getUsersPage = (req, res) => {
  if (req.session.authenticated) {
    userModel.find().then(users => {
      res.render('users', {
        users: users,
        userName: req.session.name,
        userAvatar: req.session.avatar,
      })
    })
  } else {
    res.redirect('/')
  }
}

exports.getProductCreatePage = (req, res) => {
  if (req.session.authenticated) {
    res.render('productCreate', {
      userName: req.session.name,
      userAvatar: req.session.avatar,
    })
  } else {
    res.redirect('/')
  }
}

exports.updateProduct = (req, res) => {
  if (req.session.authenticated) {
    productModel
      .update(req.body)
      .where('_id')
      .equals(req.params.id)
      .exec()
      .then(() => {
        res.redirect(`/admin/products/${req.params.id}`)
      })
  } else {
    res.redirect('/')
  }
}

exports.deleteProduct = (req, res) => {
  if (req.session.authenticated) {
    productModel
      .deleteOne()
      .where('_id')
      .equals(req.params.id)
      .exec()
      .then(() => {
        res.redirect('/admin/products')
      })
  } else {
    res.redirect('/')
  }
}

exports.createNewProduct = (req, res) => {
  if (req.session.authenticated) {
    const productDetails = req.body
    productDetails.thumbnail = req.file.originalname
    productDetails.image = req.file.originalname

    productModel.create(productDetails).then(() => {
      res.redirect('/admin/products')
    })
  } else {
    res.redirect('/')
  }
}

exports.getProductDetails = (req, res) => {
  if (req.session.authenticated) {
    productModel
      .findOne({})
      .where('_id')
      .equals(req.params.id)
      .exec()
      .then(product => {
        res.render('productDetails', {
          product: product,
          userName: req.session.name,
          userAvatar: req.session.avatar,
        })
      })
  } else {
    res.redirect('/')
  }
}

exports.getUserDetails = (req, res) => {
  if (req.session.authenticated) {
    userModel
      .findOne({})
      .where('_id')
      .equals(req.params.id)
      .exec()
      .then(user => {
        res.render('usersDetails', {
          user: user,
          userName: req.session.name,
          userAvatar: req.session.avatar,
        })
      })
  } else {
    res.redirect('/')
  }
}

exports.logout = (req, res) => {
  if (req.session.authenticated) {
    req.session.authenticated = false
    res.redirect('/')
  } else {
    res.redirect('/')
  }
}
