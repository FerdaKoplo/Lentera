import React from 'react'
import SidebarCommunity from '../components/community/sidebar/sidebar-community'
import { Outlet } from 'react-router-dom'

const CommunityLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden items-center">
      <SidebarCommunity />
      <main className="flex-1 overflow-y-auto bg-white">
        <Outlet />
      </main>
    </div>
  )
}

export default CommunityLayout