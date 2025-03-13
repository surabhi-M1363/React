import express from 'express';
import { Accident } from '../models/index.js';
import { Sequelize } from 'sequelize';

const routerAnalytics = express.Router();

// Get summary of accidents
routerAnalytics.get('/summary', async(req, res) => {
    try {
        // 1️⃣ Get accident count per month
        const accidentByMonth = await Accident.findAll({
            attributes: [
                [Sequelize.fn('MONTH', Sequelize.col('date')), 'month'],
                [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
            ],
            group: ['month']
        });

        // Convert SQL result to a structured object
        const monthlyData = {};
        accidentByMonth.forEach(row => {
            monthlyData[row.dataValues.month] = row.dataValues.count;
        });

        // Ensure all months are included (default to 0 if no accidents)
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const formattedAccidents = months.map((month, index) => ({
            month,
            accidents: monthlyData[index + 1] || 0 // Months are 1-indexed
        }));

        // 2️⃣ Get accident count by severity
        const severityCount = await Accident.findAll({
            attributes: ['severity', [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']],
            group: ['severity']
        });

        // Convert to structured format
        const severityData = {
            minor: 0,
            moderate: 0,
            severe: 0,
            fatal: 0
        };

        severityCount.forEach(row => {
            severityData[row.dataValues.severity.toLowerCase()] = row.dataValues.count;
        });

        res.json({ accidentsByMonth: formattedAccidents, severityData });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default routerAnalytics;