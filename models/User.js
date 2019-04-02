module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        name: DataTypes.STRING,
        role: DataTypes.STRING,
        email: DataTypes.STRING,
        username: DataTypes.STRING
    }, {
        tableName: 'users'
    });
    User.associate = function (models) {
        // associations can be defined here
    };
    return User;
};