// declaration
const expres = require('express')
const routes = expres.Router()

// controllers
const users = require('../controllers/login');
const setup = require('../controllers/setup');
const Product = require('../controllers/product');

routes.get('/', users.login);
routes.get('/login',users.login)
routes.post('/auth', users.login.auth);
routes.get('/SetUp', setup.ViewSetUp);
routes.post('/Setup', setup.AddSetUp);
routes.get('/SetUp/Edit/:Id', setup.getSetUpById);
routes.post('/SetUp/Delete/:Id', setup.deleteSetUp);
routes.get('/Product', Product.ViewProductPage);
routes.post('/Product', Product.getProduct);
routes.get('/GetStock/:productId', Product.GetProductStock);
routes.get('/UpdateStock', Product.UpdateProductStock);
routes.post('/UpdateStock', Product.ViewProductPage);
routes.get('/updateAllProducts', Product.UpdateAllProducts);
routes.post('/updateAllProductStock', Product.UpdateAllProductStock);
routes.get('/logout', users.logout);

module.exports = routes
