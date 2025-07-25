import React from 'react'
import { FaHeart } from "react-icons/fa6"

const LikeButton = () => {
  return (
    <div>
        <button className='font-bold flex bg-gradient-to-r text-white py-2 px-2 rounded-full from-[#BCA7E8] to-[#A8E6CF]'>
              <FaHeart />
        </button>  
    </div>
  )
}

export default LikeButton