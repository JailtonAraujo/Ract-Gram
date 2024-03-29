import { api,requestConfig } from '../utils/config';

// publish an user photo

const publishPhoto = async (data, token) =>{

    const config = requestConfig("POST", data, token, true);

    try{

        const res = await fetch(api + "/photo", config)
        .then((res)=>res.json())
        .catch((err)=>err)

        return res;

    }catch(error){
        console.log(error)
    }

}

// get all user photos

const getUserPhotos = async (id, token) =>{

    const config = requestConfig("GET", null, token);

    try{

        const res = await fetch(api + "/photo/user/", config)
        .then((res)=> res.json())
        .catch((err)=> err)

        return res

    }catch(error){
        console.log(error);
    }

}

//Delete fot user

const deletePhoto = async (id, token) => {

    const config = requestConfig("DELETE", null, token)

    try{

        const res = await fetch(api + "/photo/"+id, config)
        .then((res)=>res.json())
        .catch((err)=>err);

        return res;

    }catch(error){
        console.log(error)
    }

}

//update a photo
const updatePhoto  = async (data, id, token) =>{

    const config = requestConfig("PUT", data, token);

    try{

        const res = await fetch(api +"/photo/"+id, config)
        .then((res)=>res.json())
        .catch((err)=>err);

        return res;

    }catch(error){
        console.log(error)
    }

}


//Get a photo by id
const getPhotoById = async (id, token) =>{

    const config = requestConfig("GET", null, token);

    try{

        const res = await fetch(api + "/photo/"+id, config)
        .then((res)=>res.json())
        .catch((err)=> err)

        return res;

    }catch(error){
        console.log(error);
    }

}

//photo like
const photoLike = async (id, token) =>{

    const config = requestConfig("PUT",null, token);

    try{

        const res = await fetch(api + "/photo/like/"+id, config)
        .then((res)=> res.json())
        .catch((err)=> err);

        return res;

    }catch(error){  
        console.log(error);
    }

}

const photoService = {
    publishPhoto,
    getUserPhotos,
    deletePhoto,
    updatePhoto,
    getPhotoById,
    photoLike
};

export default photoService;