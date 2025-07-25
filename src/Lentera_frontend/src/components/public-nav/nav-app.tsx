import React from 'react'
import { FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';

const NavApp = () => {
  return (
    <nav className='px-32 p-5 flex items-center justify-between '>
      <div>
        <h1 className='font-bold text-3xl'>LENTERA</h1>
      </div>

      <ul className='flex items-center gap-7'>
        <Link to={'/community/homepage'}>
          <li>
            Community
          </li>
        </Link>
        <Link to={'/articles'}>
          <li>
            Articles
          </li>
        </Link>
        <Link to={'/profile'}>
          <li className='text-3xl'>
            <FaUserCircle />
          </li>
        </Link>
      </ul>
    </nav>
  )
}

export default NavApp