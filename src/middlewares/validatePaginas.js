const joi = require('joi')

const PAGINAS =joi.object({
numPagina:joi.number().required(),
imagem:joi.string().required().min(3),
idCapitulo:joi.number().required(),
})

function validatePaginas(req,res,next){
const {numPagina, imagem, idCapitulo}=req.body

const {error}=PAGINAS.validate({numPagina, imagem, idCapitulo})

if(error){
    next({status:400,message:error.details[0].message});
}

next();
}
module.exports = validatePaginas;

//ver sobre o .number do pq ta reconhecendo uma string de numeros // por exemplo: quando eu coloco "19" ele reconhece como numero