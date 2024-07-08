const { Sequelize } = require('@sequelize/core');

const nodeEnv = process.env.NODE_ENV || 'dev';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'memory',

    define: {
        paranoid: true // to enable soft delete
    }
});


module.exports = sequelize;
