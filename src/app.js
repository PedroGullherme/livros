require('dotenv').config();

const express = require('express');

require('express-async-errors');

const {routeLivros, routePaginas}= require('./routes')

const variavelteste =process.env.TESTE

const routeCapitulos = require('./routes/routeCapitulos');

const errorMiddleware = require('./middlewares/errorMiddleware')

const app = express();

app.use(express.json());

app.use('/livros', routeLivros);

app.use('/capitulos',routeCapitulos);

app.use('/paginas', routePaginas)

app.get('/',async (req,res)=>{
    res.status(200).send('olá', variavelteste)
})
app.use(errorMiddleware)

module.exports ={
    app,
}
