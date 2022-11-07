const express = require('express');
const router = express.Router();

const {
    register,
    login,
    getCurrentUSer,
    update,
    getUserById,
} = require("../controller/USerController");

const authGuard = require('../middlewares/AuthGuard');

//midllewares
const validate = require('../middlewares/handlerValidator');
const {
    userCreateValidation,
    loginValidator, 
    userUpdateValidation,
} = require("../middlewares/UserValidation");

const {imageUpload} = require("../middlewares/imageUpload")

//Routes for register
router.post("/register",userCreateValidation(),validate,register);

router.post("/login",loginValidator(),validate,login);

router.get("/profile",authGuard, getCurrentUSer);

router.put("/",authGuard,userUpdateValidation(), 
validate,imageUpload.single("profileImage"), update )

router.get("/:id",getUserById);

module.exports = router;
