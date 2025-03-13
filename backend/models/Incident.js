import { DataTypes } from 'sequelize';
export default (sequelize) => {
    return sequelize.define('Incident', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        type: { type: DataTypes.STRING, allowNull: true },
        description: { type: DataTypes.TEXT, allowNull: true },
        date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    }, { tableName: 'incidents', timestamps: true });
};