var util = require('util');
var ProductMongo = require('../../../models/nosql/Product');

module.exports = {
    getAllProducts: getAllProducts,
    addProduct: addProduct,
    getProduct: getProduct,
    deleteProduct: deleteProduct,
    getReviews: getReviews
};

function getAllProducts(req, res) {
    console.log('Return ALL products');
    ProductMongo.find({})
        .then(value => res.json(value))
        .catch(cause => {
            console.log(cause.message);
            res.sendStatus(400);
        });
}

function addProduct(req, res) {
    console.log('Add NEW product and return it');
    return new ProductMongo(req.swagger.params.product.value).save()
        .then(value => res.json(value))
        .catch(cause => {
            console.log(cause.message);
            res.sendStatus(400);
        });
}

function getProduct(req, res) {
    console.log('Return SINGLE product');
    return ProductMongo.findById(req.swagger.params.id.value)
        .then(value => res.json(value))
        .catch(cause => {
            console.log(cause.message);
            res.sendStatus(400);
        });
}

function deleteProduct(req, res) {
    console.log('Deletes SINGLE product');
    return ProductMongo.deleteOne({_id: req.swagger.params.id.value})
        .then(value => res.sendStatus(200))
        .catch(cause => {
            console.log(cause.message);
            res.sendStatus(400);
        });
}

function getReviews(req, res) {
    console.log('Return ALL reviews for single product');
    return ProductMongo.findById(req.swagger.params.id.value)
        .then(value => res.json(value.reviews))
        .catch(cause => {
            console.log(cause.message);
            res.sendStatus(400);
        });
}