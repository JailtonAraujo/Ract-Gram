const User = require("../models/User");

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

//generate user token

const generateToken = (id) =>{
    return jwt.sign({id},jwtSecret,{
        expiresIn:"7d"
    });
};

//register new User
const register = async(req, res) =>{
    
    const {name, email, password} = req.body;

    //check if exists user
    const user = await User.findOne({email});

    if(user){
        res.status(422).json({errors:["Email ja resgistrado!"]});
        return;
    }

    //Generate password hash
    const salt = await bcrypt.genSalt();
    const passwordHash =  await bcrypt.hash(password,salt);

    //Create USer
    const newUSer = await User.create({
        name,
        email,
        password: passwordHash
    })

    //If user was created sucessfully, return the token
    if(!newUSer){
        res.status(422).json({errors:["Houve um erro, por favor tente mais tarde!"]});
    }

    res.status(201).json({
        _id: newUSer._id,
        token:generateToken(newUSer._id),
    });


};

//Sigin User
const login = async (req, res) =>{
    const {email, password} = req.body;

    const user = await User.findOne({email});

    //check id user exists
    if(!user){
        res.status(403).json({ errors:["Email ou senha invalidos!"]});
        return;
    }

    //compare password
    if(!(await bcrypt.compare(password, user.password))){
        res.status(403).json({
            errors:["Senha invalida!"]
        })
    }

    res.status(200).json({
        _id: user._id,
        profileImage:user.profileImage,
        token:generateToken(user._id),
    });

};

//Get current USer
const getCurrentUSer = async (req, res) =>{
    const user = req.user;

    res.status(200).json(user);
}

module.exports = {
    register,
    login,
    getCurrentUSer
};