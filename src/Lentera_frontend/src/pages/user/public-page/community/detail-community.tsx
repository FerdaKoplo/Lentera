import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useCommunity from '../../../../hooks/useCommunity'
import useDiscussion from '../../../../hooks/useDiscussion'
import PostDiscussionForm from '../../discussion/create-discussion'
import SidebarCommunity from '../../../../components/community/sidebar/sidebar-community'
import NavApp from '../../../../components/public-nav/nav-app'
import { FaUserFriends } from 'react-icons/fa'
import useAuth from '../../../../hooks/useAuth'
import { Principal } from '@dfinity/principal'

const DetailCommunity: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const { 
        getCommunityDetail, 
        community, 
        joinCommunity, 
        leaveCommunity 
    } = useCommunity()
    const { discussions, getDiscussionsByCommunity } = useDiscussion()
    const { principalId, isAuthenticated } = useAuth()

    useEffect(() => {
        if (id) {
            const communityId = BigInt(id)
            getCommunityDetail(communityId)
            getDiscussionsByCommunity(communityId)
        }
    }, [id])

    const communityId = id ? BigInt(id) : BigInt(0)
    const communityDiscussions = discussions.filter(
        (item) => item.communityId === communityId
    )

    const bannerSrc = community?.communityBanner?.length
        ? community.communityBanner[0]
        : undefined

    const isMember = community?.communityMember.some(
        (member) => member.userId.toString() === principalId
    )

    const handleJoin = async () => {
        await joinCommunity(communityId, Principal.fromText(principalId))
        await getCommunityDetail(communityId)
    }

    const handleLeave = async () => {
        await leaveCommunity(communityId, Principal.fromText(principalId))
        await getCommunityDetail(communityId)
    }

    return (
        <div>
            <NavApp />
            <div className="px-32 flex min-h-screen">
                <SidebarCommunity />
                <div className="flex-1 px-16 py-10">
                    <div className="mb-8">
                        <img
                            src={bannerSrc}
                            alt=""
                            className="rounded-lg w-full h-40 object-cover mb-4 bg-gray-200"
                        />
                        <div className='flex gap-2 items-center justify-between'>
                            <div className='flex items-center gap-2'>
                                <p className="font-semibold text-black text-2xl">
                                    <FaUserFriends />
                                </p>
                                <h1 className="text-2xl font-semibold text-black">
                                    {community ? community.communityTitle : "Loading Community..."}
                                </h1>
                            </div>

                            {isAuthenticated && (
                                isMember ? (
                                    <button
                                        className="border-[#BCA7E8] border-2 font-semibold  text-[#BCA7E8] px-4 py-2 rounded-full"
                                        onClick={handleLeave}
                                    >
                                        Leave Community
                                    </button>
                                ) : (
                                    <button
                                        className="bg-gradient-to-r from-[#BCA7E8] to-[#A8E6CF] font-semibold text-white px-4 py-2 rounded-full"
                                        onClick={handleJoin}
                                    >
                                        Join Community
                                    </button>
                                )
                            )}
                        </div>
                    </div>

                    {isMember ? (
                        <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
                            <PostDiscussionForm communityId={communityId} />
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg p-6 shadow-sm mb-8 text-center text-gray-500">
                            Join this community to start posting discussions.
                        </div>
                    )}

                    <div>
                        <h2 className="text-xl font-semibold text-black mb-6">
                            Community Discussions
                        </h2>

                        {communityDiscussions.length === 0 && (
                            <p className="text-gray-500">No discussions yet.</p>
                        )}

                        {communityDiscussions.map((discussion, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg p-4 mb-6 shadow border"
                            >
                                <div className="flex items-center mb-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
                                    <div className='flex items-center gap-4'>
                                        <p className="font-semibold text-black text-2xl">
                                            <FaUserFriends />
                                        </p>
                                        <p className="text-gray-400 text-sm">
                                            @{discussion.authorDiscussion.toString()}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-gray-700 mb-4">
                                    {discussion.discussionContent}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailCommunity
