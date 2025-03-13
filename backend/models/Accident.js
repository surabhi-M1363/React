import { DataTypes } from 'sequelize';
export default (sequelize) => {
    return sequelize.define('Accident', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        location: { type: DataTypes.STRING, allowNull: true },
        description: { type: DataTypes.TEXT, allowNull: true },
        date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    }, { tableName: 'accidents', timestamps: true });
};