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

    if(photos.length == 0){
        res.status(404).json({errors:["Nenhuma foto encontrada"]});
        return;
    }


    res.status(200).json({photos});
}

module.exports = {
    insertPhoto,
    deletePhoto,
    getAllPhotos,
    getAllPhotosByUseId,
}