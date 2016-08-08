import Sequelize from 'sequelize';
const User = {
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