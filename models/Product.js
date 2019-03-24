module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        name: DataTypes.STRING,
        quantity: DataTypes.INTEGER
    }, {
        tableName: 'products'
    });
    Product.associate = function (models) {
        Product.hasMany(models.Review);
    };
    return Product;
};