import React from 'react'
import { NavConstant } from './constant/landing-constant'

interface NavbarProps {
  navlist : Array<{key:string; label:string}>,
  onNavClick : (sectionKey: string) => void
}


const NavLanding : React.FC<NavbarProps> = ({ navlist, onNavClick }) => {
    return (
        <nav className='flex justify-between items-center px-32 w-full sticky top-0 p-5'>
            <h1 className='font-bold text-2xl'>
                LENTERA
            </h1>
            <ul className='flex gap-8'>
                {NavConstant.map((i) => (
                    <li>
                        <button onClick={() => onNavClick(i.key)} className=''>
                            {i.label}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default NavLanding