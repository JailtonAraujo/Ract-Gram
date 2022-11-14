import {api, requestConfig} from "../utils/config"

//Get user datails
const profile = async (data,token) =>{
    const config = requestConfig("GET",data,token);

    try {
        
        const res = fetch(api + "/user/profile",config)
        .then((res)=> res.json())
        .catch((err)=>err);

        return res;

    } catch (error) {
        console.log(error)
    }
}

//update user datails
const updateProfile = async (data,token) =>{
    const config = requestConfig("PUT",data,token,true);

    try {
        
        const res = await fetch(api + "/user/", config)
        .then((res)=> res.json())
        .catch((err) => err);

        return res;

    } catch (error) {
        console.log(error)
    }
}


const userService = {
    profile,
    updateProfile,
}

export default userService;