import React, { useEffect, useState } from 'react'
import useCommunity from '../../../../hooks/useCommunity'
import useDiscussion from '../../../../hooks/useDiscussion'
import { FaUserFriends } from 'react-icons/fa'
import { FaCircleUser } from 'react-icons/fa6'

const ListCommunityPost = () => {

  const { getAllCommunities, communities } = useCommunity()
  const { getAllDiscussions, discussions } = useDiscussion()
  const [communityMap, setCommunityMap] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    getAllCommunities(),
      getAllDiscussions()
  }, [])

  useEffect(() => {
    const map: { [key: string]: string } = {}
    communities.forEach((cm) => {
      map[cm.id.toString()] = cm.communityTitle
    })
    setCommunityMap(map)
  }, [communities])


  return (
    <div className="p-10">
      <h1 className="font-bold text-xl mb-5">All Community Posts</h1>

      {discussions.map((post, index) => (
        <div key={index} className="bg-white flex flex-col gap-6 rounded-lg p-5 mb-5 shadow">
          <div className="flex items-center mb-2 text-sm text-gray-600">
            <FaUserFriends className="mr-2 text-xl" />
            <span>{communityMap[post.communityId.toString()] || "Unknown Community"}</span>
          </div>
          <div className='flex items-center gap-5'>
            <p className='text-3xl'><FaCircleUser /></p>
            <p className='text-xs font-medium'>@{post.authorDiscussion.toString()}</p>
          </div>
            <p className="mt-2 text-xl font-bold">{post.discussionTitle}</p>
            <p className="text-gray-700 mt-2">{post.discussionContent}</p>
        </div>
      ))}
    </div>
  )
}

export default ListCommunityPost