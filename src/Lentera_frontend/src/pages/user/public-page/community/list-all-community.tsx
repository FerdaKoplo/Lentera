import React, { useEffect } from 'react'
import NavApp from '../../../../components/public-nav/nav-app'
import { Link } from 'react-router-dom'
import { FaCompass, FaPlus } from 'react-icons/fa6'
import { IoMdHome } from 'react-icons/io'
import { FaUserFriends } from 'react-icons/fa'
import useCommunity from '../../../../hooks/useCommunity'
import ViewButton from '../../../../components/community/buttons/view-button'
import SidebarCommunity from '../../../../components/community/sidebar/sidebar-community'

const ListAllCommunity = () => {

  const { communities, getAllCommunities } = useCommunity()

  useEffect(() => {
    getAllCommunities()
  }, [])

  return (
    <div className='px-10 py-10'>
      <div className='grid grid-cols-2 gap-20'>
        {communities.map((cm, i) => (
          <div key={i} className='flex flex-col gap-7'>
            <div className='flex items-center gap-5'>
              <p className='text-3xl'><FaUserFriends /></p>
              <h1 className='font-bold text-xl '>{cm.communityTitle}</h1>
            </div>
            <div className='w-full '>
              <div className='w-full'>
                <ViewButton communityId={cm.id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListAllCommunity