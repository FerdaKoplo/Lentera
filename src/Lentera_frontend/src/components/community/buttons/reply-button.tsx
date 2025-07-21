import React from 'react'
import { BsChat } from "react-icons/bs";

interface ReplyButtonProps {
    onClick : () => void
}

const ReplyButton : React.FC<ReplyButtonProps> = ({ onClick }) => {
    
    return (
        <div>
            <button onClick={onClick} className='font-bold flex bg-gradient-to-r text-white py-2 px-2 rounded-full from-[#BCA7E8] to-[#A8E6CF]'>
                <BsChat />
            </button>
        </div>
    )
}

export default ReplyButton