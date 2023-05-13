const express = require('express')
const connection = require('../db/connection');
const route = express.Router();
const validateLivros = require('../middlewares/validateLivros')

route.get('/',async (req, res) => {
    const [result] = await connection.execute('SELECT * FROM livros');
    res.status(200).json(result);
});
route.post('/', validateLivros, async (req, res) => {
    const {titulo, autor, genero, imagemCapa} = req.body;
    const [result] = await connection.execute('INSERT INTO livros(titulo, autor, genero, imagemCapa) VALUES(?,?, ?, ?)',[titulo, autor, genero, imagemCapa])
   
    const newLivro = {
        id:result.insertId,
        titulo, 
        autor, 
        genero, 
        imagemCapa
    }
    res.status(201).json(newLivro);
})
route.put('/:id', validateLivros, async(req, res) => {
    const {titulo, autor, genero, imagemCapa} = req.body;
    const {id} = req.params;

    const [[result]] = await connection.execute('SELECT * FROM livros WHERE id =?',[id]);

    if(!result) {
        res.status(404).json({message:'Livro não encontrado!'})
    }

    const updateLivro = connection.execute(`UPDATE livros 
    SET titulo = ?, autor = ? , genero = ?, imagemCapa = ?
    WHERE id = ?`, [titulo, autor, genero, imagemCapa, id])

    const newLivro = {
        id,
        titulo, 
        autor, 
        genero, 
        imagemCapa
    }

    res.status(201).json(newLivro);
})
route.delete('/:id',async(req,res)=>{
    const{id} = req.params;

    const [[result]] = await connection.execute('SELECT * FROM livros WHERE id =?',[id]);

    if(!result) {
        res.status(404).json({message:'Livro não encontrado'})
    }

    await connection.execute('DELETE FROM livros WHERE id=?', [id])

    res.status(204).send();
})

route.get('/:id',async (req, res) => {
    const {id} = req.params;
    const [[result]] = await connection.execute('SELECT * FROM livros WHERE id =?',[id]);
    res.status(200).json(result);
});
    module.exports = route;