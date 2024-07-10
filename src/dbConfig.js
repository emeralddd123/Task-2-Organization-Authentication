const { Sequelize } = require('@sequelize/core');
const pgUrl = process.env.DB_URL

const nodeEnv = process.env.NODE_ENV || 'dev';

let sequelize

if (nodeEnv == 'dev'){
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: 'memory',
    
        define: {
            paranoid: true 
        }
    });
} else {
    sequelize = new Sequelize({
        dialect: 'postgres',
        url: pgUrl
    })
}




module.exports = sequelize;
