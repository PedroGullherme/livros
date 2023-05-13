const mysql  = require("mysql2/promise");
require('dotenv').config();
const user = process.env.DB_NAME
const host = process.env.DB_HOST
const host2 = process.env.DB_HOST2
const password = process.env.DB_PASS
const port = process.env.DB_PORT
const database = process.env.DB_DATABASE

const connection = mysql.createPool({
    host     : host | host2,
    user     : user,
    password : password,
    port     : port,
    database: database
})

module.exports = connection;