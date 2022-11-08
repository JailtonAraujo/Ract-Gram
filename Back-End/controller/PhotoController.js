const Photo = require("../models/Photo");
const User = require("../models/User");

const mongoose = require("mongoose");

//Insert a photo, with an user related to it
const insertPhoto = async (req, res) =>{
    
    const {title} = req.body;
    const image = req.file.filename;

    const reqUser = req.user;

    const user = await User.findById(reqUser._id);

    //create a photo
    const newPhoto = await Photo.create({
        image,
        title,
        userId:user._id,
        userName:user.name,
    });

    if(!newPhoto){
        res.status(422).json({
            errors:["Houve um problema, tente novamente mais tarde!"]
        })
        return;
    }
    res.status(200).json({newPhoto});
};

//Delete photo by id
const deletePhoto = async (req, res) =>{
    const {id} = req.params;

    const reUser = req.user;

    try {
        
        const photo = await Photo.findById(mongoose.Types.ObjectId(id));

    //check if photo exists
    if(!photo){
        res.status(404).json({errors:["Photo não encontrada"]});
        return;
    }

    //check if photo belongs to user
    if(!photo.userId.equals(reUser._id)){
        res.status(422).json({errors:["Ocorreu um erro, por favor tente maa=is tarde!"]})
    }

    await Photo.findByIdAndDelete(photo._id);

    res.status(200)
    .json({id:photo._id,message:"Foto excluida com sucesso!"});

    } catch (error) {
        res.status(404).json({errors:["Photo não encontrada"]});
    }
}

//Get all photos
const getAllPhotos = async (req,res) =>{

    const photos = await Photo.find({})
                                .sort([["createdAt",-1]])
                                .exec();

    res.status(200).json({photos});
                        
}

//Get photos by User id
const getAllPhotosByUseId = async (req, res) =>{
    const reqUser = req.user;

    const photos = await Photo.find({userId:reqUser._id}).sort([["createdAt",-1]]).exec();

    // if(photos.length == 0){
    //     res.status(404).json({errors:["Nenhuma foto encontrada"]});
    //     return;
    // }


    res.status(200).json({photos});
}

const getPhotoById = async (req, res)=>{
    const {id} = req.params;

    try {
        
        const photo = await Photo.findById(mongoose.Types.ObjectId(id));

        if(!photo){
            res.status(404).json({errors:["Foto não encontrada!"]});
            return;
        }

        res.status(200).json(photo);

    } catch (error) {
        res.status(404).json({errors:["Foto não encontrada!"]});
        console.log(error);
        return;
    }
};

//update a photo
const updatePhoto = async (req, res) =>{

    const {id} = req.params;
    const {title} = req.body;

    const reqUser = req.user;

    try {

        const photo = await Photo.findById(mongoose.Types.ObjectId(id));

    //check if exists a photo
    if(!photo){
        res.status(404).json({errors:["Foto não encontrada!"]});
        return;
    }

    // check if photo belongs to user
    if(!photo.userId.equals(reqUser._id)){
        res.status(422).json({errors:["Ocorreu um erro, tente mais tarde!"]});
        return;
    }

    if(title){
        photo.title = title;
    }

    await photo.save();

    res.status(200).json({photo,message:"Foto atualizanda com sucesso!"});
        
    } catch (error) {
        res.status(404).json({errors:["Foto não encontrada!"]});
        console.log(error)
        return;
    }

};

//like funcionality
const likePhoto = async (req, res) =>{

    const {id} = req.params;

    const reqUser = req.user;

    try {
        
        const photo = await Photo.findById(mongoose.Types.ObjectId(id));

        //check if exists photo
        if(!photo){
            res.status(404).json({errors:["Foto não encontrada!"]});
            return;
        }

        //check if user already liked the photo
        if(photo.likes.includes(reqUser._id)){
            res.status(422).json({errors:["Você já curtiu a foto!"]});
            return;
        }

        //put user id in likes arrays
        photo.likes.push(reqUser._id);

        await photo.save();

        res.status(201).json({photoId: id, userID:reqUser._id, message:"A foto foi curtida!"});

    } catch (error) {
        res.status(404).json({errors:["Foto não encontrada!"]});
        console.log(error);
        return;
    }
}

//coment a photo
const commentPhoto = async (req, res) =>{

    const {id} = req.params;

    const reqUser = req.user;

    const {comment} = req.body;

    try {
        
        const user = await User.findById(reqUser._id);

        const photo = await Photo.findById(mongoose.Types.ObjectId(id));

        ///check if exists photo
        if(!photo){
            res.status(404).json({errors:["Foto não encontrada!"]});
            return;
        }

        const commentUser = {
            comment,
            userName:user.name,
            userImage:user.profileImage,
            userId:user._id
        }

        photo.comments.push(commentUser);

        await photo.save();

        res.status(201).json({comment:commentUser,message:"O comentario foi adicionado com sucesso!"});

    } catch (error) {
        res.status(404).json({errors:["Foto não encontrada!"]});
        console.log(error);
        return;
    }

};

//Search photos by title
const searcPhotoByTitle = async (req,res) =>{

    const {q} = req.query;

    const photos = await Photo.find({title: new RegExp(q, "i")}).exec();

    // if(photos.length == 0){
    //     res.status(404).json({errors:["nenhuma foto relacionada a ese titulo!"]});
    //     return;
    // }

    res.status(200).json(photos);
}

module.exports = {
    insertPhoto,
    deletePhoto,
    getAllPhotos,
    getAllPhotosByUseId,
    getPhotoById,
    updatePhoto,
    likePhoto,
    commentPhoto,
    searcPhotoByTitle,
}