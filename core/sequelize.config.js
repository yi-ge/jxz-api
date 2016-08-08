import Sequelize from 'sequelize';
const User = {
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

export {
    User,
};