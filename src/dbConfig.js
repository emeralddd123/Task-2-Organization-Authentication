const { Sequelize } = require('@sequelize/core');
const pgUrl = process.env.DB_URL

const nodeEnv = process.env.NODE_ENV || 'dev';
let sequelize


if (nodeEnv == 'prod') {
    sequelize = new Sequelize({
        dialect: 'postgres',
        url: pgUrl,
        sync: { alter: true },

        define: {
            paranoid: true
        }
    })
} else {
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: 'memory',
        sync: { force: true },

        define: {
            paranoid: true
        }
    });
}


module.exports = sequelize;
