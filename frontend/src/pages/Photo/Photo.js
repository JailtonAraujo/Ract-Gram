import './Photo.css'

//hooks
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getPhotoById, likePhoto } from '../../slices/photoSlice';
import PhotoItem from '../../components/PhotoItem';
import LikeContainer from '../../components/LikeContainer';


const Photo = () => {

    const {id} = useParams();

    const dispath = useDispatch();

    const {photo:photoData, loading, message} = useSelector((state)=> state.photo);
    const {user} = useSelector((state)=>state.auth);

    useEffect(()=>{
        dispath(getPhotoById(id));
    },[id,dispath])


    const handlerLike = () =>{
        dispath(likePhoto(id))
    }

    if(loading){
        return <p>Carregando...</p>
    }

  return (
            <div id='photo'>
                <PhotoItem photo={photoData}/>
                <LikeContainer photo={photoData} user={user} handlerLike={handlerLike} />
            </div>
  )
}

export default Photo