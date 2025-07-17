import React, { useEffect } from 'react'
import { FaPlus, FaUserFriends } from "react-icons/fa";
import SidebarProfile from '../../../components/profile/SidebarProfile';
import ViewButton from '../../../components/community/view-button';
import HelperAuthorCommunityButton from '../../../components/community/helper-button';
import { Link } from 'react-router-dom';
import useCommunity from '../../../hooks/useCommunity';
import useAuth from '../../../hooks/useAuth';
import { Principal } from '@dfinity/principal';


const ListAuthorCommunity = () => {

  const { getAllCommunitiesAuthor, communities } = useCommunity()
  const { principalId } = useAuth()

  useEffect(() => {
    if (principalId && principalId.trim() !== "") {
      try {
        const authorId = Principal.fromText(principalId);
        getAllCommunitiesAuthor(authorId);
        console.log("Fetching articles for:", authorId.toString());
      } catch (error) {
        console.error("Invalid principalId received:", principalId);
      }
    } else {
      console.warn("principalId is missing, skipping fetch.");
    }
  }, [principalId, getAllCommunitiesAuthor])

  return (
    <div className='px-10 py-10 flex flex-col gap-10 w-full'>
      <div className='flex justify-between'>
        <h1>All Groups</h1>
        <Link to={'/create-community'}>
          <div className='flex items-center gap-4'>
            <p className='px-2 py-2 bg-gradient-to-r text-white font-bold rounded-full from-[#BCA7E8] to-[#A8E6CF]'><FaPlus /></p>
            <p className='font-semibold'>Create Community</p>
          </div>
        </Link>
      </div>

      <div className='grid grid-cols-2 gap-20'>
        {communities.map((cm, i) => (
          <div key={i} className='flex flex-col gap-7'>
            <div className='flex items-center gap-5'>
              <p className='text-3xl'><FaUserFriends /></p>
              <h1 className='font-bold text-xl '>{cm.communityTitle}</h1>
            </div>

            <div className='flex items-center gap-6 justify-between'>
              <div>
                <ViewButton communityId={cm.id} />
              </div>

              <div>
                <HelperAuthorCommunityButton />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListAuthorCommunity