import React, { useState } from 'react'
import SidebarProfile from '../../../components/profile/SidebarProfile'
import useCommunity from '../../../hooks/useCommunity'
import { Principal } from '@dfinity/principal'
import useAuth from '../../../hooks/useAuth'

const CreateCommunity = () => {
  const { createCommunity, loading, error } = useCommunity()
  const { principalId } = useAuth()

  const [title, setTitle] = useState('')
  const [banner, setBanner] = useState<string | null>(null)
  const [previewBanner, setPreviewBanner] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      const base64 = reader.result as string
      setBanner(base64)
      setPreviewBanner(base64)
    }
    reader.readAsDataURL(file)
  }

  const handleCreateCommunity = async (e: React.FormEvent) => {
    e.preventDefault()

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

    const communityData = {
      id: BigInt(0),
      authorCommunityId: authorId,
      communityTitle: title,
      communityBanner: banner ? [banner] as [string] : [] as [],
      communityMember: [],
      createdAt: BigInt(Date.now()),
    }

    console.log("Submitting community:", communityData)
    await createCommunity(communityData)
    alert("Community created successfully!")
  }

  return (
    <div className='flex h-screen overflow-hidden bg-[#FAFFFD]'>
      <SidebarProfile />

      <div className="flex flex-1 justify-center items-center p-8 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-90 h-90 opacity-30">
            <img src="/assets/flower.svg" alt="Decorative flower" className="w-full h-full object-contain" />
          </div>
          <div className="absolute bottom-0 left-0 w-[350px] h-[350px] opacity-30">
            <img src="/assets/flower.svg" alt="Decorative flower" className="w-full h-full object-contain" />
          </div>
        </div>

        <form
          onSubmit={handleCreateCommunity}
          className="bg-[#f2fff9] relative p-8 rounded-xl shadow-lg w-full max-w-lg space-y-6 border-2 border-[#70D3B5]"
        >
          <h1 className="text-center font-montserrat font-bold text-3xl text-[#65C3A6]">
            Create New Community
          </h1>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div className="space-y-2">
            <label className="block text-sm font-montserrat font-medium text-[#32c093]">
              Community Title
            </label>
            <input
              type="text"
              placeholder="Enter community name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 rounded bg-[#d5f5eb] text-black border border-[#70D3B5] focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-100"
              required
            />
          </div>

          <div className="space-y-2">
            <p className="block text-sm font-montserrat font-medium text-[#32c093]">
              Community Banner (optional)
            </p>
            <input
              id="bannerImage"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="bannerImage"
              className="py-2 px-4 bg-white border-2 border-[#70D3B5] text-[#63C2A5] rounded-lg font-medium font-montserrat text-lg hover:bg-teal-50 hover:border-teal-500 hover:text-teal-500 active:bg-teal-100 transition-all duration-200 block text-center cursor-pointer"
            >
              Choose Banner Image
            </label>

            {previewBanner && (
              <img src={previewBanner} alt="Banner Preview" className="w-full h-40 object-cover rounded-lg shadow mt-2" />
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-gradient-to-r from-[#BCA7E8] to-[#A8E6CF]  text-white rounded-full font-medium font-montserrat text-lg "
          >
            {loading ? "Creating..." : "Create Community"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateCommunity
