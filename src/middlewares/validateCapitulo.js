const joi = require('joi')

const CAPITULO =joi.object({
titulo:joi.string().required().min(3),
numCapitulo:joi.number().required(),
idLivro:joi.number().required(),
})

function validateCapitulo(req,res,next){
const {titulo, numCapitulo, idLivro}=req.body

const {error}=CAPITULO.validate({titulo, numCapitulo, idLivro})

if(error){
    next({status:400,message:error.details[0].message});
}

next();
}
module.exports = validateCapitulo;