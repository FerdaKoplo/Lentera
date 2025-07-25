import React, { useState } from 'react'
import { Principal } from '@dfinity/principal'
import useAuth from '../../../hooks/useAuth'
import useDiscussion from '../../../hooks/useDiscussion'

interface PostDiscussionFormProps {
  communityId: bigint
}

const PostDiscussionForm: React.FC<PostDiscussionFormProps> = ({ communityId }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const { createDiscussion } = useDiscussion()
  const { principalId } = useAuth()

  const handleSubmit = async () => {

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
    if (!title.trim() || !content.trim()) return

    setSubmitting(true)

    const newDiscussion = {
      id: BigInt(0), 
      communityId,
      authorDiscussion: authorId ?? Principal.anonymous(),  
      discussionTitle: title,
      discussionContent: content,
      discussionReplyId: [],
      createdAt: BigInt(Date.now()),  
    }

    await createDiscussion(newDiscussion)
    setTitle('')
    setContent('')
    setSubmitting(false)
  }

  return (
    <div className="rounded-lg p-4 mb-6 shadow-sm">
      <div className="mb-3 text-sm font-semibold text-gray-600">Start a new discussion in this community</div>
      <input
        type="text"
        placeholder="Title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-2 p-2 border border-gray-300 rounded"
      />
      <textarea
        placeholder="Share your thoughts..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
        className="w-full p-2 border border-gray-300 rounded resize-none"
      />
      <button
        onClick={handleSubmit}
        disabled={submitting}
        className="mt-3 bg-gradient-to-r from-[#BCA7E8] to-[#A8E6CF] rounded-full text-white font-semibold px-4 py-2 "
      >
        {submitting ? "Posting..." : "Post Discussion"}
      </button>
    </div>
  )
}

export default PostDiscussionForm
