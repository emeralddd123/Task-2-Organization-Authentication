require('dotenv').config();

const port = process.env.PORT || 3000;
const app = require('./app');
const db = require('./dbConfig');


db.sync({ alter: true }).then(() => {
    console.log('Database is in sync');
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
