const express = require('express')
const connection = require('../db/connection');
const route = express.Router();
const validatePaginas = require('../middlewares/validatePaginas');

route.get('/',async (req, res) => {
    const [result] = await connection.execute('SELECT * FROM paginas');
    res.status(200).json(result);
});
route.post('/', validatePaginas, async (req, res) => {
    const {numPagina, imagem, idCapitulo} = req.body;
    const [result] = await connection.execute('INSERT INTO paginas (numPagina,imagem,idCapitulo) VALUES(?,?,?)',[numPagina, imagem, idCapitulo]);
   
    const newLivro = {
        id:result.insertId, //ID da PAGINA
        numPagina, 
        imagem,
        idCapitulo // ID do capitulo
    }

    res.status(201).json(newLivro);
})
route.put('/:id', validatePaginas, async(req, res) => {
    const {idCapitulo, numPagina, imagem} = req.body;
    const {id} = req.params;

    const [[result]] = await connection.execute('SELECT * FROM paginas WHERE id =?',[id]);

    if(!result) {
        res.status(404).json({message:'Página não encontrada'})
    }

    const updatePagina = connection.execute(`UPDATE paginas 
    SET numPagina = ?, imagem = ? 
    WHERE id = ?`, [numPagina, imagem, id])

    const newPagina = {
        id,
        numPagina,
        imagem
    }

    res.status(201).json(newPagina);
})
route.delete('/:id',async(req,res)=>{
    const{id} = req.params;

    const [[result]] = await connection.execute('SELECT * FROM paginas WHERE id =?',[id]);

    if(!result) {
        res.status(404).json({message:'Página não encontrada'})
    }

    await connection.execute('DELETE FROM paginas WHERE id=?', [id])

    res.status(204).send();
})
route.get('/:id',async (req, res) => {
    const {id} = req.params;
    const [[result]] = await connection.execute('SELECT * FROM paginas WHERE id =?',[id]);
    if(!result) {
        res.status(404).json({message:'Página não encontrada'})
    }
    res.status(200).json(result);
});

    module.exports = route;