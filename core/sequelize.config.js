import Sequelize from 'sequelize';
const User = {
    id:{
        type: Sequelize.STRING,
        primaryKey:true
    },
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    }
};

export {
    User,
};