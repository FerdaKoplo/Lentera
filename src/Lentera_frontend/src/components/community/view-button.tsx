import React from 'react'
import { Link } from 'react-router-dom'

interface ViewButtonProps {
  communityId: bigint | string
}

const ViewButton : React.FC<ViewButtonProps> = ({ communityId }) => {
    return (
        <div>
            <Link to={`/detail-community/${communityId.toString()}`} >
                <button className='font-semibold flex bg-gradient-to-r text-white py-2 px-5 rounded-full from-[#BCA7E8] to-[#A8E6CF]'>
                    View Community
                </button>
            </Link>
        </div>
    )
}

export default ViewButton