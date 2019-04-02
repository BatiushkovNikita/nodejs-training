var util = require('util');

module.exports = {
    getAllProducts: getAllProducts
};

function getAllProducts(req, res) {
    console.log('Return ALL products');
    // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
    var name = req.swagger.params.name.value || 'stranger';
    var hello = util.format('Hello, %s!', name);

    // this sends back a JSON response which is a single string
    res.json(hello);
}
