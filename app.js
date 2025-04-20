const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const ui = require('./routes/ui')
const path = require('path');
const auth = require('./routes/auth')

app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');


app.use('/auth', auth);
app.use('/', ui);

app.listen(3000);