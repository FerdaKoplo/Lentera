import React from 'react'
import { Link } from 'react-router-dom'

const HeroLanding = () => {
    return (
        <div className='bg-[#FAFFFD]'>
            <div className='flex gap-5 justify-center min-h-screen flex-col items-center'>
                <h1 className='text-7xl font-bold mint-violet'>LENTERA</h1>
                <p className='text-lg'>Rediscover Peace. Together, Forever</p>
                <div className='flex items-center gap-5'>
                    <Link to={'/login'}>
                        <button className='font-bold flex bg-gradient-to-r text-white py-3 px-5 rounded-full from-[#BCA7E8] to-[#A8E6CF]'>
                            Start Your Journey
                        </button>
                    </Link>

                    <button className='border-[#A8E6CF] rounded-full py-2 px-5 border-4'>
                        About Lentera
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HeroLanding