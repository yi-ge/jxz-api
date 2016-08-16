/**
 * Created by NX on 2016/8/4.
 */
import Sequelize from 'sequelize';
import {dev239,localhost} from './database.config.json';
const config = localhost;
const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port:config.port || 3306,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    //logging:false,
});

sequelize.authenticate().then((err)=> {
    console.log('Connection has been established successfully.');
}).catch((err)=> {
    console.log('Unable to connect to the database:', err);
});

export default sequelize;
