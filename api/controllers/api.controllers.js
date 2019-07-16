const ProductModel = require('../../models/product')
const UserModel = require('../../models/user')
const CategoryModel = require('../../models/category')

//========== For Products controller without async and await============
exports.getProducts = (req, res) => {
  const filterString = req.query.filter
  if (filterString) {
    filterJson = JSON.parse(filterString)
    ProductModel.find(filterJson.where)
      .skip(filterJson.offset)
      .limit(filterJson.limit)
      .exec()
      .then(products => {
        res.send(products)
      })
      .catch(err => {
        res.status(500).send(err)
      })
  } else {
    ProductModel.find({}).then(products => {
      res.send(products)
    })
    .catch(err => res.status(500).send(err))
  }
}

exports.getProduct = (req, res) => {
  ProductModel.findOne({})
    .where('_id')
    .equals(req.params.id)
    .exec()
    .then(result => {
      res.send(result)
    })
    .catch(err => res.status(500).send(err))
}

exports.updatePartiallyProduct = (req, res) => {
  let data = req.body
  ProductModel.updateOne(data)
    .where('_id')
    .equals(req.params.id)
    .exec()
    .then(result => {
      res.send(result)
    })
    .catch(err => res.status(500).send(err))
}

exports.updateEntirelyProduct = (req, res) => {
  let data = req.body
  ProductModel.findById({_id: req.params.id})
  .set(data)
  .exec()
  .then(result => {
    res.send(result)
  })
  .catch(err => res.status(500).send(err))
}

exports.deleteProduct = (req, res) => {
  ProductModel.deleteOne({})
    .where('_id')
    .equals(req.params.id)
    .exec()
    .then(result => {
      res.send(result)
    })
    .catch(err => res.status(500).send(err))
}

exports.createProduct = (req, res) => {
  let newProduct = req.body
  ProductModel.create(newProduct)
    .then(result => res.send(result))
    .catch(err => res.status(500).send(err))
}

exports.filterProduct = (req, res, next) => {
  const filterString = req.query.filter
  console.log(filterString)
}

// ========== for users with async and await =============

exports.getUsers = async (req, res) => {
  const filterString = req.query.filter
  if (filterString) {
    filterJson = JSON.parse(filterString)
    try {
      let result = await ProductModel.find(filterJson.where)
        .skip(filterJson.offset)
        .limit(filterJson.limit)
        .exec()
      res.send(result);
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    try {
      let result = await UserModel.find().exec()
      res.send(result)
    } catch (err) {
      res.status(500).send(err)
    }
  }
}

exports.getUser = async (req, res) => {
  try {
    var user = await UserModel.findById(req.params.id).exec()
    {user && res.send(user)};
    {!user && res.send("user is not exits")}

  } catch (err) {
    res.status(500).send(err)
  }
}

exports.updateEntirelyUser = async (req, res) => {
  try {
    let user = await UserModel.findById(req.params.id).exec()
    user.set(req.body);
    console.log(user)
    var result = await user.save();
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
}

exports.updatePartiallyUser = async (req, res) => {
  try{
    let result = await UserModel.findByIdAndUpdate({_id: req.params.id},req.body).exec()
    res.send(result)
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.deleteUser = async (req, res) => {
  try {
    let result = await UserModel.deleteOne({_id: req.params.id}).exec();
    res.send(result)
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.createUser = async (req, res) => {
  try {
    let user = new UserModel(req.body)
    let result = await user.save()
    res.send(result)
  } catch (err) {
    res.status(500).send(err)
  }
}

// ============ for category ===============

exports.getCategories = (req, res) => {
  const filterString = req.query.filter
  if (filterString) {
    filterJson = JSON.parse(filterString)
    ProductModel.find(filterJson.where)
      .skip(filterJson.offset)
      .limit(filterJson.limit)
      .exec()
      .then(categories => {
        res.json(categories)
      })
      .catch(err => {
        res.send(err)
      })
  } else {
    CategoryModel.find({}).then(categories => {
      res.json(categories)
    })
  }
}

exports.getCategory = (req, res) => {
  CategoryModel.findOne({})
    .where('_id')
    .equals(req.params.id)
    .exec()
    .then(category => {
      res.json(category)
    })
}

exports.updatePartiallyCategory = (req, res, next) => {
  let data = req.body
  CategoryModel.updateMany(data)
    .where('_id')
    .equals(req.params.id)
    .exec()
    .then(() => {
      res.json({ message: 'Update success!' })
    })
    .catch(err => next(err))
}

exports.updateEntirelyCategory = (req, res) => {
  let data = req.body
  CategoryModel.findById({_id: req.params.id})
  .set(data)
  .exec()
  .then(result => {
    res.send(result)
  })
  .catch(err => res.status(500).send(err))
}

exports.deleteCategory = (req, res, next) => {
  CategoryModel.deleteOne({})
    .where('_id')
    .equals(req.params.id)
    .exec()
    .then(() => {
      res.json({ message: 'Delete success!' })
    })
    .catch(err => next(err))
}

exports.createCategory = (req, res, next) => {
  let newCategory = req.body
  CategoryModel.create(newCategory)
    .then(result => res.json(result))
    .catch(err => next(err))
}
