import React, { useState } from 'react'
import { StatusPost } from '../../../declarations/Lentera_backend/Lentera_backend.did'
import { Lentera_backend } from '../../../declarations/Lentera_backend'

const useStatus = () => {

    const [statusPosts, setStatusPosts] = useState<StatusPost[]>([])
    const [statusPost, setStatusPost] = useState<StatusPost | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)


    const getAllStatusPost = async () => {
        setLoading(true)
        try {
            const resultFetchStatusPost = await Lentera_backend.getAllStatusPost()
            setStatusPosts(resultFetchStatusPost)
        } catch (e) {
            setError(String(e))
        }
        finally {
            setLoading(false)
        }
    }

    const createStatusPost = async (newStatusPost: StatusPost) => {
        setLoading(true)
        try {
            const resultCreateStatusPost = await Lentera_backend.createStatusPost(newStatusPost)
            if ("ok" in resultCreateStatusPost) {
                setStatusPost(resultCreateStatusPost.ok);
            } else {
                setError(resultCreateStatusPost.err);
            }
            await getAllStatusPost()
            return resultCreateStatusPost
        } catch (err) {
            setError(String(err))
        } finally {
            setLoading(false)
        }
    }

    const deleteStatusPost = async (statusPostId: bigint) => {
        setLoading(true)
        try {
            const resultStatusPostDelete = await Lentera_backend.deleteStatusPost(statusPostId)
            if ("ok" in resultStatusPostDelete) {
                setStatusPost(null);
            } else {
                setError(resultStatusPostDelete.err);
            }
            await getAllStatusPost()
            return resultStatusPostDelete
        } catch (err) {
            setError(String(err))
        } finally {
            setLoading(false)
        }
    }

    return {
        statusPost,
        statusPosts,
        loading,
        error,
        getAllStatusPost,
        createStatusPost,
        deleteStatusPost
    }
}

export default useStatus