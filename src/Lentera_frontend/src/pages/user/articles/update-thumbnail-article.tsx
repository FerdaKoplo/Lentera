import React, { useState } from 'react'
import useArticle from '../../../hooks/useArticle'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateThumbnailArticle = () => {
  const { articleId } = useParams<{ articleId: string }>()
  const { updateArticleThumbnail, loading, error } = useArticle()
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const navigate = useNavigate()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setSelectedFile(file)

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
      navigate('/profile/articles')
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFFFD] px-4 overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-90 h-90 opacity-30">
          <img src="/assets/flower.svg" alt="Decorative flower" className="w-full h-full object-contain" />
        </div>
        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] opacity-30">
          <img src="/assets/flower.svg" alt="Decorative flower" className="w-full h-full object-contain" />
        </div>
      </div>

      <div className="bg-[#f2fff9] p-8 rounded-xl shadow-lg w-full max-w-lg space-y-6 items-center justify-center border-2 border-[#70D3B5]">
        <h1 className="text-center font-montserrat font-bold text-3xl text-[#65C3A6]">
          Update Article Thumbnail
        </h1>
        <h3 className="text-center font-montserrat font-medium text-xl text-[#7fd1b7]">
          Upload a new image for your article
        </h3>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div className="space-y-4">
          <input
            id="thumbnailFile"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          <label
            htmlFor="thumbnailFile"
            className="py-2 px-4 bg-white border-2 border-[#70D3B5]
            text-[#63C2A5] rounded-lg font-medium font-montserrat text-lg
            hover:bg-teal-50 hover:border-teal-500 hover:text-teal-500
            active:bg-teal-100 transition-all duration-200 cursor-pointer block text-center"
          >
            Choose Image
          </label>

          {selectedFile?.name && (
            <p className="mt-1 text-sm font-montserrat font-medium text-[#32c093] text-center">
              {selectedFile.name}
            </p>
          )}

          {previewImage && (
            <div className="flex justify-center">
              <img
                src={previewImage}
                alt="Thumbnail Preview"
                className="w-32 h-32 object-cover rounded-lg mt-2 shadow"
              />
            </div>
          )}
        </div>

        {loading && <p className="text-[#BCA7E8] font-semibold text-center">Uploading...</p>}

        {!loading && previewImage && (
          <p className="text-center text-green-600 font-semibold">
            Thumbnail updated successfully!
          </p>
        )}
      </div>
    </div>
  )
}

export default UpdateThumbnailArticle
