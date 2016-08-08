/**
 * Created by NX on 2016/8/4.
 */
import Sequelize from 'sequelize';

const sequelize = new Sequelize('test', 'root', 'tiger', {
    host: 'localhost',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

sequelize.authenticate().then(function (err) {
        console.log('Connection has been established successfully.');
    })
    .catch(function (err) {
        console.log('Unable to connect to the database:', err);
    });

export default sequelize;