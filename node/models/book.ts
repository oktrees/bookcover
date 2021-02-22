import { Model, DataTypes } from 'sequelize';
import { dbType } from './index';
import { sequelize } from './sequelize';

class Book extends Model {
    public readonly id!: number;
    public title!: string;
    public nick!: string;
    public contents!: string;
    public frontimg!: string;
    public backimg!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date; 
}

Book.init({
    title: {
        type: DataTypes.STRING(40),
        allowNull: false,
    },
    nick: {
        type: DataTypes.STRING(15),
        allowNull: true,
        defaultValue: 'admin',
    },
    contents: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    frontimg: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    backimg: {
        type: DataTypes.STRING(100),
        allowNull: true,
    }
}, {
    sequelize,
    modelName: 'Book',
    tableName: 'book',
    paranoid: false,
    charset: 'utf8',
    collate: 'utf8_general_ci',
});    

export const associate = (db: dbType) => {
    
}

export default Book;


