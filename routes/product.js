import express from 'express';
import {Product, Review} from '../models';

const router = express.Router();

router.get('/:id', (req, res) => {
    console.log('Return SINGLE product');
    req.product
        .then(value => res.json(value))
        .catch(console.error);
});

router.get('/:id/reviews', (req, res, next) => {
    console.log('Return ALL reviews for single product');
    Review.findAll({
        where:
            {ProductId: req.params.id}
    })
        .then(value => res.json(value))
        .catch(console.error);
});

router.route('/')
    .get((req, res, next) => {
        console.log('Return ALL products');
        Product.findAll()
            .then(value => res.json(value))
            .catch(console.error);
    })
    .post((req, res, next) => {
        console.log('Add NEW product and return it');
        Product.create(req.body)
            .then(value => res.json(value))
            .catch(console.error);
    });

router.param('id', (req, res, next, id) => {
    req.product = Product.findByPk(id);
    next();
});

module.exports = router;
