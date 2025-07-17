import React from 'react'
import { FaUserCircle } from "react-icons/fa";

const NavApp = () => {
  return (
    <nav className='px-32 p-5 flex items-center justify-between '>
      <div>
        <h1 className='font-bold text-3xl'>LENTERA</h1>
      </div>

      <ul className='flex items-center gap-7'>
        <li>
            Community
        </li>
        <li>
            Articles
        </li>
        <li className='text-3xl'>
            <FaUserCircle />
        </li>
      </ul>
    </nav>
  )
}

export default NavApp