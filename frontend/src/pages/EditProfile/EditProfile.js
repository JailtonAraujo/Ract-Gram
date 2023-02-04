import "./EditProfile.css"

import { uploads } from "../../utils/config"

//hooks
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"

//redux
import {profile,resetMessage, updateProfile} from "../../slices/useSlice"

//components
import Message from "../../components/Message"


const EditProfile = () => {

    const dispatch = useDispatch();

    const {user, message, error, loading} = useSelector((state)=>state.user)

    //states
    const[name, setName] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[profileImage, setImageProfile] = useState("");
    const[bio, setBio] = useState("");
    const[previwImage, setPreviwImage] = useState("");

    //load user data
    useEffect(()=>{
        dispatch(profile());

    },[dispatch]);

    //Fill form with user data
    useEffect(()=>{
        if(user){
            setName(user.name);
            setEmail(user.email);
            setBio(user.bio);
        }
    },[user])



    const handlerSubmit = async (e) =>{
        e.preventDefault();

        const userDate ={
            name
        }

        if(profileImage){
            userDate.profileImage = profileImage
        }

        if(bio){
            userDate.bio = bio;
        }
        if(password){
            userDate.password = password
        }

        const formDate = new FormData()

        const userFormDate = Object.keys(userDate).forEach((key)=> formDate.append(key, userDate[key]))

        formDate.append("user",userFormDate)

        await dispatch(updateProfile(formDate))

        setTimeout(()=>{
            dispatch(resetMessage())
        },2000)

    }



    const handlerFile = (e) =>{
        //image previw
        const image = e.target.files[0]
        setPreviwImage(image)
        
        console.log(image)

        //update image state
        setImageProfile(image)
    }

  return (<div id="edit-prifile">

        <h2>Edite seus dados</h2>
        <p className="subtitle">Adicione uma imagem de perfil e conte mais sobre você...</p>
        {(user.profileImage || previwImage) && (
            <>
                <img className="profile-image"
                src={previwImage ? URL.createObjectURL(previwImage) 
                : `${uploads}/users/${user.profileImage}`} 
                alt={user.name} />
            </>
        )}

        <form onSubmit={handlerSubmit}>

            <input type="text" placeholder="Nome" onChange={(e)=>setName(e.target.value)} value={name || ""}/>
            <input type="email" placeholder="E-mail" disabled  value={email || ""}/>
            <label>
                <span>Imagem do perfil:</span>
                <input type="file" onChange={handlerFile}/>
            </label>

            <label>
                <span>Bio:</span>
                <input type="text" placeholder="Descrição do perfil" onChange={(e)=>setBio(e.target.value)} value={bio || ""}/>
            </label>
            <label>
                <span>Quer alterar senha?</span>
                <input type="password" placeholder="Digite sua nova senha" onChange={(e)=>setPassword(e.target.value)} value={password || ""}/>
            </label>
            {!loading && <input type="submit" value="Atualizar"/>}
            {loading && <input type="submit" value="Aguarde" disabled/>}
            {error && <Message msg={error} type="error"/>}
            {message && <Message msg={message} type="success"/>}


        </form>
    </div>
  )
}

export default EditProfile