var UserMongo = require('../../../models/nosql/User');

module.exports = {
    getAllUsers: getAllUsers,
    deleteUser: deleteUser
};

function getAllUsers(req, res) {
    console.log('Return ALL users');
    return UserMongo.find({})
        .then(value => res.json(value))
        .catch(cause => {
            console.log(cause.message);
            res.sendStatus(400);
        });
}

function deleteUser(req, res) {
    console.log('Deletes SINGLE user');
    return UserMongo.deleteOne({_id: req.swagger.params.id.value})
        .then(value => res.sendStatus(200))
        .catch(cause => {
            console.log(cause.message);
            res.sendStatus(400);
        });
}