import React, { useState } from 'react'
import { ArticleComment } from '../../../declarations/Lentera_backend/Lentera_backend.did'
import { Lentera_backend } from '../../../declarations/Lentera_backend'

const useArticleComment = () => {

    const [articleComments, setArticleComments] = useState<ArticleComment[]>([])
    const [articleComment, setArticleComment] = useState<ArticleComment | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<String | null>(null)

    const getCommentedArticles = async (articleId: bigint) => {
        setLoading(true)
        setError(null)
        try {
            const resultFetch = await Lentera_backend.getArticleComments(articleId)
            setArticleComments(resultFetch)
        } catch (e) {
            setError(String(e))
            setArticleComments([])
        } finally {
            setLoading(false)
        }
    }

    const createArticleComment = async (newArticleComment: ArticleComment) => {
        setLoading(true)
        setError(null)
        try {
            const result = await Lentera_backend.createArticleComment(newArticleComment)
            return result
        } catch (e) {
            setError(String(e))
            throw e
        } finally {
            setLoading(false)
        }
    }

    const updateArticleComment = async (articleCommentId: bigint, updateArticleComment : string) => {
        setLoading(true)
        setError(null)
        try {
            const result = await Lentera_backend.updateArticleComment(articleCommentId, updateArticleComment)
            return result
        } catch (e) {
            setError(String(e))
            throw e
        } finally {
            setLoading(false)
        }
    }

    const deleteArticleComment = async (articleCommentId: bigint) => {
        setLoading(true)
        setError(null)
        try {
            const result = await Lentera_backend.deleteArticleComment(articleCommentId)
            return result
        } catch (e) {
            setError(String(e))
            throw e
        } finally {
            setLoading(false)
        }
    }


    return {

    }
}

export default useArticleComment