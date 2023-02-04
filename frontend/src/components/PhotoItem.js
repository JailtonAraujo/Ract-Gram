import { Link } from 'react-router-dom'
import { uploads } from '../utils/config'
import './PhotoItem.css'

const PhotoItem = ({photo}) => {
  return (
    <div className='photo-item'>
        {photo.image && (
            <img src={`${uploads}/photos/${photo.image}`} alt={photo.totle} />
        )}
        <h2> {photo.title}</h2>
        <p className='photo-author'>
            Publicada por : <Link to={`/users/${photo.userId}`} >{photo.userName}</Link>
        </p>
    </div>
  )
}

export default PhotoItem