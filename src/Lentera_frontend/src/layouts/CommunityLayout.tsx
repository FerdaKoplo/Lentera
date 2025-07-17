import React from 'react'
import SidebarCommunity from '../components/community/sidebar/sidebar-community'
import { Outlet } from 'react-router-dom'
import NavApp from '../components/public-nav/nav-app'

const CommunityLayout = () => {
    return (
        <div className='flex flex-col '>
            <NavApp />
            <div className="flex h-screen px-32 overflow-hidden ">
                <SidebarCommunity />
                <main className="flex-1 overflow-y-auto bg-white">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default CommunityLayout