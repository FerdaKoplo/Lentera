import React, { useState } from 'react'
import useStatus from '../../../hooks/useStatus'
import useAuth from '../../../hooks/useAuth'
import { Principal } from '@dfinity/principal'
import { FaUserCircle } from 'react-icons/fa'

const CreateStatus = () => {

    const [statusContent, setStatusContent] = useState<string>('')
    const { createStatusPost, statusPosts, error, loading, getAllStatusPost } = useStatus()
    const { principalId } = useAuth()

    let authorId
    if (principalId && principalId.trim() !== "") {
        try {
            authorId = Principal.fromText(principalId)
        } catch (error) {
            console.error("Invalid principalId from backend or auth hook:", principalId)
            authorId = Principal.fromText("aaaaa-aa")
        }
    } else {
        console.warn("No principalId detected, using fallback.")
        authorId = Principal.anonymous()
    }


    const handleCreateStatusPost = async (e: React.FormEvent) => {
        e.preventDefault()

        const statusPostData = {
            id: BigInt(0),
            postAuthor: authorId ?? Principal.fromText("aaaaa-aa"),
            statusContent: statusContent,
            statusLike: BigInt(0),
            likedBy: [],
            createdAt: BigInt(Date.now())

        }
        const resultCreate = await createStatusPost(statusPostData)
        console.log("Berhasil membuat status" + resultCreate)
    }

    if (error) return <p className="text-red-500 text-sm">Error: {error}</p>
    
    return (
        <div className='flex flex-col gap-5'>
            <div className='flex items-center gap-2'>
                <p className='text-3xl'><FaUserCircle /></p>
                <p>@{authorId.toString()}</p>
            </div>
            <form onSubmit={handleCreateStatusPost} className="space-y-4">
                <textarea
                    className="w-full rounded p-2 focus:outline-none resize-none focus:ring focus:ring-[#A8E6CF]"
                    rows={4}
                    placeholder="What's on your mind?"
                    value={statusContent}
                    
                    onChange={(e) => setStatusContent(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="font-bold flex  bg-gradient-to-r text-white py-2 px-4 rounded-full from-[#BCA7E8] to-[#A8E6CF]"
                >
                    Post
                </button>
            </form>
        </div>
    )
}

export default CreateStatus