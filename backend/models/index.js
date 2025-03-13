import sequelize from '../db.js';
import defineAccident from './Accident.js';
import defineIncident from './Incident.js';
import defineUser from './User.js';
import defineLocation from './Location.js';
import defineNotification from './Notification.js';

const Accident = defineAccident(sequelize);
const Incident = defineIncident(sequelize);
const User = defineUser(sequelize);
const Location = defineLocation(sequelize);
const Notification = defineNotification(sequelize);

sequelize.sync({ force: false }) // Change to true to recreate tables
    .then(() => console.log("Database synchronized"))
    .catch(err => console.error("Error syncing database:", err));

export { Accident, Incident, User, Location, Notification };