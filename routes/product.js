import express from 'express';
import productsData from '../data/products';

const router = express.Router();

router.get('/:id', (req, res) => {
    console.log('Return SINGLE product');
    res.json(req.product);
});

router.get('/:id/reviews', (req, res, next) => {
    console.log('Return ALL reviews for single product');
    res.json(req.product.reviews);
});

router.route('/')
    .get((req, res, next) => {
        console.log('Returm ALL products');
        res.json(productsData);
    })
    .post((req, res, next) => {
        console.log('Add NEW product and return it');
        res.json(req.body);
    });

router.param('id', (req, res, next, id) => {
    let product = productsData.find(function (o) {
        return o.id === id;
    });
    req.product = product;
    next();
});

module.exports = router;
