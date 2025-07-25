import React, { useEffect } from 'react'
import { FaUserFriends } from 'react-icons/fa'
import { FaCompass, FaPlus } from 'react-icons/fa6'
import { IoMdHome } from 'react-icons/io'
import { Link } from 'react-router-dom'
import useCommunity from '../../../hooks/useCommunity'
import useAuth from '../../../hooks/useAuth'
import { Principal } from '@dfinity/principal'
import useArticle from '../../../hooks/useArticle'
import SidebarMenuArticle from './sidebar-menu-article'

const SidebarArticle = () => {

    const menuItems = [
        {
            label: "Discover",
            path: "/articles/discover",
            icon: <FaCompass className='text-xl' />
        },
        {
            label: "Your Articles",
            path: "/profile/articles",
            icon: <FaUserFriends className='text-xl' />
        }
    ]


    return (
        <div className='flex flex-col gap-4'>
            <Link to={'/create-article'}>
                <div className='flex items-center gap-4'>
                    <p className='px-2 py-2 bg-gradient-to-r text-white font-bold rounded-full from-[#BCA7E8] to-[#A8E6CF]'>
                        <FaPlus />
                    </p>
                    <p className='font-semibold'>New Article</p>
                </div>
            </Link>

            <ul className='flex flex-col gap-2'>
                {menuItems.map((item, index) => (
                    <li key={index} className='flex items-center gap-3'>
                        {item.icon}
                        <SidebarMenuArticle
                            label={item.label}
                            path={item.path}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default SidebarArticle
