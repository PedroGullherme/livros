const express = require('express')
const connection = require('../db/connection');
const validateCapitulo = require('../middlewares/validateCapitulo')

const route = express.Router();

route.get('/',async (req, res) => {
    const [result] = await connection.execute('SELECT * FROM capitulos');
    res.status(200).json(result);
});
route.post('/', validateCapitulo, async (req, res) => {
    const {titulo, numCapitulo, idLivro} = req.body;
    const [result] = await connection.execute('INSERT INTO capitulos(titulo,numCapitulo,idLivro) VALUES(?,?,?)',[titulo, numCapitulo, idLivro])
   
    const newCapitulo = {
        id:result.insertId,
        titulo,
        numCapitulo,
        idLivro
    }
    res.status(201).json(newCapitulo);
})
route.put('/:id', validateCapitulo, (req, res) => {
    const {titulo, numCapitulo, idLivro} = req.body;
    const {id} = req.params;

    const updateLivro = connection.execute(`UPDATE capitulos 
    SET titulo = ?, numCapitulo = ? ,idLivro=?
    WHERE id = ?`, [titulo, numCapitulo, idLivro, id])

    const newLivro = {
        id,
        titulo,
        numCapitulo,
        idLivro
    }

    res.status(201).json(newLivro);
})
route.delete('/:id',async(req,res)=>{
    const{id} = req.params;

    await connection.execute('DELETE FROM capitulos WHERE id=?', [id])

    res.status(204).send();
})
route.get('/:id',async (req, res) => {
    const {id} = req.params;
    const [[result]] = await connection.execute('SELECT * FROM capitulos WHERE id =?',[id]);
    res.status(200).json(result);
});


    module.exports = route;