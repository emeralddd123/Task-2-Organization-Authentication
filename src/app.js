const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { join } = require('path');


require('dotenv').config();

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());

app.use(morgan('common'));

app.use(express.json()); // body parser: json
app.use(express.urlencoded({ extended: true })); // body prser: formdata

app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use('/api/auth', require('./user/auth.routes'));
app.use('/api/users', require('./user/user.routes'));
app.use('/api/organisations', require('./organization/routes'));
// app.use('/', require('./webRouter'));

app.get('', async(req, res)=> {
    res.status(200).json({message:"Welcome to Oganization's Authentication"})
})

app.get('*', async (req, res) => {
    let message;
    res.status(404).render('404');
});

module.exports = app ;
