import { DataTypes } from 'sequelize';
export default (sequelize) => {
    return sequelize.define('Location', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: true }
    }, { tableName: 'locations', timestamps: true });
};