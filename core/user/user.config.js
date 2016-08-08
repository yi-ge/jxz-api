import Sequelize from 'sequelize';
export default {
    id:{
        type: Sequelize.INTEGER,
        primaryKey:true
    },
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    }
};