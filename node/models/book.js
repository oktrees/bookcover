const Sequelize = require('sequelize');

module.exports = class Book extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            title: {
                type: Sequelize.STRING(40),
                allowNull: false,
            },
            nick: {
                type: Sequelize.STRING(15),
                allowNull: true,
                defaultValue: 'admin',
            },
            contents: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            frontimg: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            backimg: {
                type: Sequelize.STRING(100),
                allowNull: true,
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Book',
            tableName: 'books',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {}
};

