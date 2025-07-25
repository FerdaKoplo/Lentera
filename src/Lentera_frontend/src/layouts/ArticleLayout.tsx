import React from 'react'
import { Outlet } from 'react-router-dom'
import NavApp from '../components/public-nav/nav-app'
import SidebarArticle from '../components/article/sidebar/sidebar-article'

const ArticleLayout = () => {
    return (
        <div className='flex flex-col '>
            <NavApp />
            <div className="flex h-screen px-32 overflow-hidden ">
                <SidebarArticle />
                <main className="flex-1 overflow-y-auto bg-white">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default ArticleLayout