const joi = require('joi')

const LIVRO =joi.object({
titulo:joi.string().required().min(3),
autor:joi.string().required().min(3),
genero:joi.string().required().min(3),
imagemCapa:joi.string().required().min(3),
})

function validateLivros(req,res,next){
const {titulo, autor, genero, imagemCapa}=req.body

const {error}=LIVRO.validate({titulo, autor, genero, imagemCapa})

if(error){
    next({status:400,message:error.details[0].message});
}

next();
}
module.exports = validateLivros;