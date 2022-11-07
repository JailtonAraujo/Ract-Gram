const {validationResult} = require('express-validator');

const validate = (req, res, next) =>{

    const errors = validationResult(req)

    if(errors.isEmpty()){
        return next();
    }

    const extractdErros = [];

    errors.array().map((err)=>extractdErros.push(err.msg))

    return res.status(422).json({
        errors:extractdErros
    })
}

module.exports = validate;