const { Sequelize } = require('@sequelize/core');
const pgUrl = process.env.DB_URL

const nodeEnv = process.env.NODE_ENV || 'dev';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'memory',

    define: {
        paranoid: true
    },

    sync: { force: true }
});



module.exports = sequelize;
