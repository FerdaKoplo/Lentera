import React, { useEffect } from 'react'
import { FaUserFriends } from 'react-icons/fa'
import { FaCompass, FaPlus } from 'react-icons/fa6'
import { IoMdHome } from 'react-icons/io'
import { Link } from 'react-router-dom'
import SidebarMenuCommunity from './sidebar-menu-community'
import useCommunity from '../../../hooks/useCommunity'
import useAuth from '../../../hooks/useAuth'
import { Principal } from '@dfinity/principal'

const SidebarCommunity = () => {

    const { communities, getJoinedCommunites } = useCommunity()
    const { principalId } = useAuth()


    const menuItems = [
        {
            label: "Homepage",
            path: "/community/homepage",
            icon: <IoMdHome className='text-xl' />
        },
        {
            label: "Discover",
            path: "/community/discover",
            icon: <FaCompass className='text-xl' />
        },
        {
            label: "Your Community",
            path: "/profile/community",
            icon: <FaUserFriends className='text-xl' />
        }
    ]

    useEffect(() => {
        if (principalId && principalId.trim() !== "") {
            try {
                const authorId = Principal.fromText(principalId);
                getJoinedCommunites(authorId);
                console.log("Fetching articles for:", authorId.toString());
            } catch (error) {
                console.error("Invalid principalId received:", principalId);
            }
        } else {
            console.warn("principalId is missing, skipping fetch.");
        }
    }, [principalId, getJoinedCommunites])

    return (
        <div className='flex flex-col gap-4'>

            <Link to={'/create-community'}>
                <div className='flex items-center gap-4'>
                    <p className='px-2 py-2 bg-gradient-to-r text-white font-bold rounded-full from-[#BCA7E8] to-[#A8E6CF]'>
                        <FaPlus />
                    </p>
                    <p className='font-semibold'>New Community</p>
                </div>
            </Link>

            <ul className='flex flex-col gap-2'>
                {menuItems.map((item, index) => (
                    <li key={index} className='flex items-center gap-3'>
                        {item.icon}
                        <SidebarMenuCommunity
                            label={item.label}
                            path={item.path}
                        />
                    </li>
                ))}
            </ul>

            <div className='border border-[#D8D8D8] w-full my-4'></div>

            <div>
                <div className='flex justify-between mb-2'>
                    <h1 className='text-sm font-semibold'>Community you're in</h1>
                    <h1 className='font-bold text-[#63C2A5] text-sm cursor-pointer'>View all</h1>
                </div>

                <ul className='flex flex-col gap-3'>
                    {communities.slice(0, 3).map((community, idx) => (
                        <li key={idx} className='flex items-center gap-3'>
                            <Link
                                to={`/detail-community/${community.id.toString()}`}
                                className='hover:underline flex items-center gap-4'
                            >
                                <FaUserFriends className='text-xl' />
                                <h1 className='font-bold'>{community.communityTitle}</h1>
                            </Link>
                        </li>

                    ))}

                    {communities.length > 3 && (
                        <li className='text-center text-gray-400 font-semibold'>
                            ...
                        </li>
                    )}
                </ul>
            </div>

        </div>
    )
}

export default SidebarCommunity
