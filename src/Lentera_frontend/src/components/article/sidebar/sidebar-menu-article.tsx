import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

interface SidebarMenuArticleProps {
    label: string
    path: string
}

const SidebarMenuArticle : React.FC<SidebarMenuArticleProps> = ({  label, path }) => {

    const navigate = useNavigate()
    const location = useLocation()
    const isActive = location.pathname === path

    return (
        <button
            onClick={() => navigate(path)}
            className={`block w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 font-semibold font-montserrat ${isActive
                ? "text-green-600 bg-green-50"
                : "text-gray-700 hover:bg-gray-100"
                }`}
        >
            {label}
        </button>
    )
}

export default SidebarMenuArticle