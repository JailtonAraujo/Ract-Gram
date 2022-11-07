const {body} = require('express-validator');

const photoInsertValidation = () =>{
    return [
        body("title")
        .not()
        .equals("undefined")
        .withMessage("O titulo é obrigatorio.")
        .isString(0)
        .withMessage("O tirulo e obrigatorio.")
        .isLength({min:3})
        .withMessage("O titule precisa ter no minimo 3 caracters"),

        body("image")
        .custom((value,{req})=>{
            if(!req.file){
                throw new Error("A imagem é obrigatoria!");
            }
            return true;
        })
    ]
}

module.exports = {
    photoInsertValidation
};