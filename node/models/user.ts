import { Model, DataTypes } from 'sequelize';
import { dbType } from './index';
import { sequelize } from './sequelize';

class User extends Model {
    public readonly id!: number;
    public nick!: string;
    public password!: string;
    public contact!: string;
    // public readonly createdAt!: Date;
    // public readonly updatedAt!: Date; 
}

User.init({
    name: {
        type: DataTypes.STRING(40),
        allowNull: true,
        unique: true,
    },
    nick: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    contact: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
}, {
    sequelize,
    timestamps: false,
    underscored: false,
    modelName: 'User',
    tableName: 'user',
    paranoid: false,
    charset: 'utf8',
    collate: 'utf8_general_ci',
});    

export const associate = (db: dbType) => {
    
}

export default User;
