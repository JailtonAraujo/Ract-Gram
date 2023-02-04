import './LikeContainer.css'

import { BsHeart, BsHeartFill } from 'react-icons/bs'

const LikeContainer = ({photo, user, handlerLike}) => {
  return (
    <div className='like'>
        {photo.likes && user && (

            <>
                {photo.likes.includes(user._id) ? (
                    <BsHeartFill/>
                ) :(
                    <BsHeart onClick={()=> handlerLike(photo)} />
                ) }
                <p>{photo.likes.length} like(s)</p>
            </>
        )}
    </div>
  )
}

export default LikeContainer