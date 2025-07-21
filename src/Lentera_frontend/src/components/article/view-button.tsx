import React from 'react'
import { FaEye } from 'react-icons/fa'
import { Link } from 'react-router-dom'

interface ViewButtonProps {
  articleId: bigint | string
}

const ViewButton: React.FC<ViewButtonProps> = ({ articleId }) => {
  return (
    <div>
      <Link to={`/articles/${articleId.toString()}`}>
        <button className='font-bold flex bg-gradient-to-r text-white py-2 px-2 rounded-full from-[#BCA7E8] to-[#A8E6CF]'>
          <FaEye />
        </button>
      </Link>
    </div>
  )
}

export default ViewButton
