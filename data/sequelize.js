/**
 * Created by NX on 2016/8/4.
 */
import Sequelize from 'sequelize';
import {dev239,localhost} from './database.config.json';

const config = process.env.NODE_ENV ? {
    host: process.env.dbHost,
    port: process.env.dbPort,
    dialect: process.env.dbDialect,

    database: process.env.dbName,
    username: process.env.dbUsername,
    password: process.env.dbPassword,

} : localhost;
const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port || 3306,
    dialect: config.dialect || "mysql",
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

//sequelize-auto -h 192.168.10.239 -p 3306 -d jxz -u mylive -x devsgo -e mysql -o modules