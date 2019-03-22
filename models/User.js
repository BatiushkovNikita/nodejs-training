import Sequelize from 'sequelize';

module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('users', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        }
    }, {});
    user.associate = (models) => {
        // associations can be defined here
    };
    return user;
};