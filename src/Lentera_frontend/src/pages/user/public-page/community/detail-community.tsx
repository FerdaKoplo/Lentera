import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useCommunity from '../../../../hooks/useCommunity'
import useDiscussion from '../../../../hooks/useDiscussion'
import PostDiscussionForm from '../../discussion/create-discussion'
import { Discussion } from '../../../../../../declarations/Lentera_backend/Lentera_backend.did'
import SidebarCommunity from '../../../../components/community/sidebar/sidebar-community'
import NavApp from '../../../../components/public-nav/nav-app'

const DetailCommunity: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const { getCommunityDetail, community } = useCommunity()
    const { discussions, getAllDiscussions } = useDiscussion()

    useEffect(() => {
        if (id) {
            const communityId = BigInt(id)
            getCommunityDetail(communityId)
            getAllDiscussions()
        }
    }, [id])

    const communityId = id ? BigInt(id) : BigInt(0)
    const communityDiscussions = discussions.filter((item) => item.communityId === communityId)

    const bannerSrc =
        community?.communityBanner?.length
            ? community.communityBanner[0]
            : undefined

    return (
        <div>
            <NavApp />
            <div className="px-32 flex bg-[#F8F8F8] min-h-screen">
                <div className="w-1/4 border-r bg-white p-6">
                    <SidebarCommunity />
                </div>

                <div className="flex-1 px-16 py-10">
                    <div className="mb-8">
                        <img
                            src={bannerSrc}
                            alt=""
                            className="rounded-lg w-full h-40 object-cover mb-4 bg-gray-200"
                        />
                        <h1 className="text-2xl font-semibold text-black">
                            {community ? community.communityTitle : "Loading Community..."}
                        </h1>
                    </div>

                    <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
                        <PostDiscussionForm communityId={communityId} />
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-black mb-6">Community Discussions</h2>
                        {communityDiscussions.length === 0 && (
                            <p className="text-gray-500">No discussions yet.</p>
                        )}

                        {communityDiscussions.map((discussion: Discussion, index) => (
                            <div key={index} className="bg-white rounded-lg p-4 mb-6 shadow border">
                                <div className="flex items-center mb-3">
                                    <div className="w-10 h-10 rounded-full  mr-3"></div>
                                    <div>
                                        <p className="font-semibold text-black"></p>
                                        <p className="text-gray-400 text-sm">@{discussion.authorDiscussion.toString()}</p>
                                    </div>
                                </div>
                                <p className="text-gray-700 mb-4">{discussion.discussionContent}</p>
                                <div className="flex space-x-4 text-sm text-gray-500">
                                    <span>99k</span>
                                    <span>99k</span>
                                    <span>●</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailCommunity
