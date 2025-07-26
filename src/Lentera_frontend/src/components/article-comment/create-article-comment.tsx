import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import useArticleComment from '../../hooks/useArticleComment'
import { Principal } from '@dfinity/principal'

interface CreateArticleCommentProps {
    articleId: bigint
}

const CreateArticleComment: React.FC<CreateArticleCommentProps> = ({ articleId }) => {

    const [commentText, setCommentText] = useState<string>('')
    const [submitting, setSubmitting] = useState<boolean>(false)
    const { principalId } = useAuth()
    const { createArticleComment, loading, error } = useArticleComment()

    const handleSubmitArticleComment = async () => {
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

        setSubmitting(true)

        const articleCommentData = {
            id: BigInt(0),
            articleId,
            commenterId: authorId ?? Principal.fromText("aaaaa-aa"),
            commentText: commentText,
            commentedAt: BigInt(Date.now()),
        }

        const result = await createArticleComment(articleCommentData)
        console.log(result)
        setCommentText('')
        setSubmitting(false)
    }


    return (
        <div className="rounded-lg p-4 mb-6 shadow-sm">
            <div className="mb-3 text-sm font-semibold text-gray-600">Start commenting this article</div>
            <textarea
                placeholder="Share your thoughts..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows={3}
                className="w-full p-2 border border-gray-300 rounded resize-none"
            />
            <button
                onClick={handleSubmitArticleComment}
                disabled={submitting}
                className="mt-3 bg-gradient-to-r from-[#BCA7E8] to-[#A8E6CF] rounded-full text-white font-semibold px-4 py-2 "
            >
                {submitting ? "Posting..." : "Post Comment"}
            </button>
        </div>
    )
}

export default CreateArticleComment