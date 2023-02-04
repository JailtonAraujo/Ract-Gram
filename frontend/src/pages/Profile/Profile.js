import './Profile.css';

import {uploads} from '../../utils/config';

//components
import Message from "../../components/Message";
import { Link } from 'react-router-dom';
import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs"

//hooks
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

//redux
import { getUserDatils } from '../../slices/useSlice';
import { publishPhoto, resetMessage, getUserPhotos, deletePhoto } from '../../slices/photoSlice';


const Profile = () => {

    const dispath = useDispatch();

    const {id} = useParams();

    const {user, loading} = useSelector((state)=> state.user);
    const {user:userAuth} = useSelector((state)=> state.auth);

    const {
        photos, 
        loading:loadingPhoto, 
        message:messagePhoto,
        error:errorPhoto
    } = useSelector((state)=>state.photo);

    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");


    //resete mensage
    const resetComponentMessage = () =>{

        setTimeout(()=>{
            resetMessage();
        },2000)

    }


    //new fomr and edit form refs
    const newPhotoForm = useRef();
    const editPhotoForm = useRef();

    //Load user data
    useEffect(()=>{
        dispath(getUserDatils(id))
        dispath(getUserPhotos(id))
    },[dispath, id])

    const handlerFile = (e) =>{
        const image = e.target.files[0];

        setImage(image);
    }

    const handlerSubmit = (e) =>{
        e.preventDefault();

        const photoData = {
            title,
            image
           } 
    
           //build form data
           const formDate = new FormData();
    
           const photoFormData = Object.keys(photoData).forEach((key)=>{
            formDate.append(key,photoData[key])
           })
    
           formDate.append("photo", photoFormData)
    
           dispath(publishPhoto(formDate));
    
           setTitle("");
    
           resetComponentMessage()

    }

    // delete a photo
    const handlerDelete = (id) =>{
        dispath(deletePhoto(id))
        
        resetComponentMessage()
    }

    if(loading){
        return <p>Carregando....</p>
    }

  return (
    
    <div id='profile' >
        <div className='profile-header'>
            {user.profileImage && (
                <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
            )}

            <div className="profile-description">
                <h2>{user.name }</h2>
                <p>{user.bio}</p>
            </div>
        </div>


        {id === userAuth._id && (
            <div className='new-photo' ref={newPhotoForm}>
                <h3>Compartilhe algum momento seu:</h3>
                <form onSubmit={handlerSubmit}>
                    <label>
                        <span>Titulo para foto</span>
                        <input type="text" 
                        placeholder='Insira um titulo' 
                        onChange={(e)=> setTitle(e.target.value)} 
                        value={title || ""}/>
                    </label>
                    <label>
                        <span>Imagem:</span>
                        <input type="file" onChange={handlerFile} />
                    </label>
                    {!loadingPhoto && <input type="submit" value="Postar"/>}
                    {loadingPhoto && <input type="submit" disabled value="Aguarde..."/>}
                </form>
            </div>
        )}
        {errorPhoto && <Message msg={errorPhoto} type="error"/>}
        {messagePhoto && <Message msg={messagePhoto} type="success"/>}

        <div className="user-photos">
            <h2>Photos publicadas:</h2> 
            <div className="photos-container">
                 {photos && 
                 photos.map((photo)=> (
                    <div className="photo" key={photo._id} >
                        {photo.image && (  <img src={`${uploads}/photos/${photo.image}`} alt={photo.title}/> )}
                       
                        {id === userAuth._id ? (
                        <div className='actions'>
                            <Link to={`/photos/${photo._id}`}>
                                <BsFillEyeFill/>
                            </Link>
                            <BsPencilFill/>
                            <BsXLg onClick={()=> handlerDelete(photo._id) }/>
                        </div>
                        ) : (
                            <Link className='btn' to={`/photos/${photo._id}`}>
                            Ver</Link>
                        )}  
                    </div>
                ))}
                 {photos.length === 0 && (<p>Ainda não há fotos publicadas...</p>)}   
            </div>   
        </div>    

    </div>
  )
}

export default Profile