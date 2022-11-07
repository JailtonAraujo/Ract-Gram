const {body} = require('express-validator');

const userCreateValidation = () =>{
    return [body("name")
    .isString()
    .withMessage("O nome é obrigatorio!")
    .isLength({min:3})
    .withMessage("O nome precisa ter no menino 3 caracteres!"),

    body("email")
    .isString()
    .withMessage("Email é obrogratorio!")
    .isEmail().withMessage("Insira um email valido!"),

    body("password")
    .isString()
    .withMessage("A seha é obrigatoria!")
    .isLength({min:5}).withMessage("A senha tem que ter no minimo 5 cactares!"),

    body("confirmpassword")
    .isString()
    .withMessage("A confirmação de senha é obrigatorio!")
    .custom((value,{req})=>{
        if(value != req.body.password){
            throw new Error ("As senha não correspondem!");
        }
        return true;
    }),

];

}

const loginValidator = () =>{
    return [
    body("email")
    .isString().withMessage("Email é obrigatorio!")
    .isEmail().withMessage("Email invalido!"),

    body("password")
    .isString()
    .withMessage("A senha é obrigatotia!")
       
]
}

module.exports = {
    userCreateValidation,
    loginValidator
}