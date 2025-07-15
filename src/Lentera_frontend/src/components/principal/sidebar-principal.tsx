import React from 'react'

const SideBarPrincipal = () => {
    return (
        <nav className='fixed bg-brand-light top-0 left-0 h-screen w-60 bg-'>
            <div className='flex flex-col items-center gap-16 justify-center py-14'>
                <h1 className='mint-violet font-bold text-3xl'>
                    LENTERA
                </h1>

                <ul className='flex font-semibold flex-col gap-7'>
                    <li>
                        Profile
                    </li>
                    <li>
                        Journals
                    </li>
                    <li>
                        Analytics
                    </li>
                    <li>
                        Community
                    </li>
                    <li>
                        Articles
                    </li>
                </ul>

                <button>
                    
                </button>
            </div>
        </nav>
    )
}

export default SideBarPrincipal