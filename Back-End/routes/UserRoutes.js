const express = require('express');
const router = express.Router();

const {register,login,getCurrentUSer}= require("../controller/USerController");
const authGuard = require('../middlewares/AuthGuard');

//midllewares
const validate = require('../middlewares/handlerValidator');
const {userCreateValidation,loginValidator} = require("../middlewares/UserValidation");


//Routes for register
router.post("/register",userCreateValidation(),validate,register);

router.post("/login",loginValidator(),validate,login);

router.get("/profile",authGuard, getCurrentUSer);

module.exports = router;
