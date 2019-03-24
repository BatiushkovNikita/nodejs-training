module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('reviews', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.STRING
            },
            productId: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('reviews');
    }
};