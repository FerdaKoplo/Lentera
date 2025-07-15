import React from 'react'
import { FaEye } from 'react-icons/fa'

const ViewButton = () => {
  return (
    <div>
        <button className='font-bold flex bg-gradient-to-r text-white py-2 px-2 rounded-full from-[#BCA7E8] to-[#A8E6CF]'>
            <FaEye />
        </button>
    </div>
  )
}

export default ViewButton