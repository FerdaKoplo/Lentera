import React from 'react'
import SideBarPrincipal from '../../components/principal/sidebar-principal'
import CreateArticle from './articles/create-article'
import { BrowserRouter, Routes, RouterProvider, Route, Navigate } from 'react-router-dom'

const PrincipalMain = () => {
    return (
        <div className='flex'>
            <SideBarPrincipal />
            <div className='pl-60'>
                <Routes>
                    <Route path='' element={<Navigate to='create-article' replace />} />
                    <Route path='create-article' element={<CreateArticle />} />
                </Routes>
            </div>
        </div>
    )
}

export default PrincipalMain