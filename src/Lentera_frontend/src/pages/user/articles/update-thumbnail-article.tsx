import React, { useState } from 'react'
import useArticle from '../../../hooks/useArticle'
import { useParams } from 'react-router-dom'

const UpdateThumbnailArticle = () => {
    const { articleId } = useParams<{ articleId: string }>()
    const { updateArticleThumbnail, loading, error } = useArticle()

    const [previewImage, setPreviewImage] = useState<string | null>(null)

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()

        reader.onload = async () => {
            const base64 = reader.result as string
            setPreviewImage(base64)  
            if (!articleId) {
                alert("Article ID is missing.")
                return
            }

            await updateArticleThumbnail(BigInt(articleId), base64)
            alert("Thumbnail updated successfully.")
        }

        reader.readAsDataURL(file)
    }

    return (
        <div className='my-4 flex flex-col gap-4'>

            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className='border rounded p-2 w-full'
            />

            {previewImage && (
                <div className='mt-4'>
                    <p className='font-bold mb-2'>Preview:</p>
                    <img src={previewImage} alt="Thumbnail Preview" className='w-full max-w-xs rounded shadow' />
                </div>
            )}

            {loading && <p className='text-blue-500'>Uploading...</p>}
            {error && <p className='text-red-500'>{error}</p>}

        </div>
    )
}

export default UpdateThumbnailArticle
