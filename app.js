const app = require('express')()
const consign = require('consign')
const db = require('./config/db')
const dontenv = require('dotenv');

dontenv.config();

app.db = db;

const port = process.env.PORT || 3000;

consign()
    .then('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

app.listen(port, () => {
    console.log('Backend executando... port:' + port)
}) 