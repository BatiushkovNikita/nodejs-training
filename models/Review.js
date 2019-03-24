module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define('Review', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        description: DataTypes.STRING,
        ProductId: {
            type: DataTypes.STRING,
            field: 'ProductId'
        }
    }, {
        tableName: 'reviews'
    });
    Review.associate = function (models) {
        Review.belongsTo(models.Product);
    };
    return Review;
};