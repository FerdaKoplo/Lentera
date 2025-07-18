import React from 'react'
import { HiOutlineDotsHorizontal } from "react-icons/hi"

interface Props {
  onClick: () => void
}

const HelperAuthorCommunityButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className='border-2 border-[#BCA7E8] py-2 px-5 rounded-full text-[#BCA7E8]'
    >
      <HiOutlineDotsHorizontal />
    </button>
  )
}

export default HelperAuthorCommunityButton
