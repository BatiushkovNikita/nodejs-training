import express from 'express';
import ProductMongo from '../../models/nosql/Product';

const router = express.Router();

router.get('/:id', (req, res) => {
    console.log('Return SINGLE product');
    req.product
        .then(value => res.json(value))
        .catch(console.error);
});

router.delete('/:id', (req, res) => {
    console.log('Deletes SINGLE product');
    ProductMongo.deleteOne({_id: req.params.id})
        .then(value => res.sendStatus(200))
        .catch(console.error);
});
router.get('/:id/reviews', (req, res, next) => {
    console.log('Return ALL reviews for single product');
    req.product
        .then(value => res.json(value.reviews))
        .catch(console.error);
});

router.route('/')
    .get((req, res, next) => {
        console.log('Return ALL products');
        ProductMongo.find({})
            .then(value => res.json(value))
            .catch(console.error);
    })
    .post((req, res, next) => {
        console.log('Add NEW product and return it');
        new ProductMongo(req.body).save()
            .then(value => res.json(value))
            .catch(console.error);
    });

router.param('id', (req, res, next, id) => {
    req.product = ProductMongo.findById(id);
    next();
});

module.exports = router;
