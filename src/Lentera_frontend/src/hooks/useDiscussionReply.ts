import { useState } from 'react'
import { DiscussionReply } from '../../../declarations/Lentera_backend/Lentera_backend.did'
import { Lentera_backend } from '../../../declarations/Lentera_backend'

const useDiscussionReply = () => {
    const [discussionReplies, setDiscussionReplies] = useState<DiscussionReply[]>([])
    const [discussionReply, setDiscussionReply] = useState<DiscussionReply | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const getRepliesByDiscussionId = async (discussionId: bigint) => {
        setLoading(true)
        setError(null)
        try {
            const resultFetch = await Lentera_backend.getRepliesByDiscussionId(discussionId)
            setDiscussionReplies(resultFetch)
        } catch (e) {
            setError(String(e))
            setDiscussionReplies([])  
        } finally {
            setLoading(false)
        }
    }

    const createDiscussionReply = async (newReply: DiscussionReply) => {
        setLoading(true)
        setError(null)
        try {
            const result = await Lentera_backend.createDiscussionReply(newReply)
            return result
        } catch (e) {
            setError(String(e))
            throw e
        } finally {
            setLoading(false)
        }
    }

    const deleteDiscussionReply = async (replyId: bigint) => {
        setLoading(true)
        setError(null)
        try {
            const result = await Lentera_backend.deleteDiscussionReply(replyId)
            return result
        } catch (e) {
            setError(String(e))
            throw e
        } finally {
            setLoading(false)
        }
    }

    return {
        discussionReplies,
        discussionReply,
        loading,
        error,
        getRepliesByDiscussionId,
        createDiscussionReply,
        deleteDiscussionReply,
    }
}

export default useDiscussionReply
