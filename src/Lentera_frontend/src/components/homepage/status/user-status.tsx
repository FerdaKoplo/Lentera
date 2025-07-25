import React, { useEffect } from 'react'
import useStatus from '../../../hooks/useStatus'
import { FaUserCircle } from 'react-icons/fa'

const UserStatus = () => {

    const { statusPosts, getAllStatusPost, error, loading } = useStatus()


    useEffect(() => {
        getAllStatusPost()
    }, [statusPosts])

    return (
        <div className='space-y-6'>
            {statusPosts.map((statusPost, index) => (
                <div className='flex flex-col gap-5' key={index}>
                    <div className='flex gap-5 items-center'>
                        <p className='text-3xl'><FaUserCircle /></p>
                        <p className='break-all'>{statusPost.postAuthor.toString()}</p>
                    </div>
                    <p>{statusPost.statusContent}</p>
                </div>
            ))}
        </div>
    )
}

export default UserStatus