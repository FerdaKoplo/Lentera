import { Principal } from '@dfinity/principal'
import React, { useEffect, useState } from 'react'
import useDiscussionReply from '../../hooks/useDiscussionReply'

interface DiscussionReplyProps {
    discussionId: bigint
    currentPrincipal: string
}

const DiscussionReply: React.FC<DiscussionReplyProps> = ({ discussionId, currentPrincipal }) => {

    const { createDiscussionReply, getRepliesByDiscussionId, discussionReplies, loading } = useDiscussionReply()
    const [replyContent, setReplyContent] = useState('')

    useEffect(() => {
        getRepliesByDiscussionId(discussionId)
    }, [discussionId])

    const handleReplySubmit = async () => {
        if (replyContent.trim() === '') return

        const newReply = {
            id: BigInt(0),
            discussionId,
            userId: Principal.fromText(currentPrincipal),
            discussionContentReply: replyContent,
            createdAt: BigInt(Date.now())
        }

        await createDiscussionReply(newReply)
        await getRepliesByDiscussionId(discussionId)
        setReplyContent('')
    }

    return (
        <div className='mt-4'>
            <textarea
                className='w-full border rounded p-2 mb-2'
                rows={3}
                placeholder='Write a reply...'
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
            ></textarea>

            <button
                className='bg-[#BCA7E8] text-white px-4 py-2 rounded'
                onClick={handleReplySubmit}
                disabled={loading}
            >
                {loading ? 'Replying...' : 'Reply'}
            </button>

            <div className='mt-4 space-y-2'>
                {discussionReplies.length === 0 ? (
                    <p className='text-gray-400 text-sm'>No replies yet.</p>
                ) : (
                    discussionReplies
                        .filter((reply) => reply.discussionId === discussionId)
                        .map((reply) => (
                            <div key={reply.id.toString()} className='border-t pt-2 text-sm text-gray-700'>
                                @{reply.userId.toString()} → {reply.discussionContentReply}
                            </div>
                        ))
                )}
            </div>
        </div>
    )
}

export default DiscussionReply