import React from 'react'
import NavApp from '../../../../components/public-nav/nav-app'
import CreateStatus from '../../../../components/homepage/status/create-status'
import UserStatus from '../../../../components/homepage/status/user-status'
import ListAllArticle from '../article/list-all-article'
import { Link } from 'react-router-dom'

const Homepage = () => {
    return (
        <div>
            <NavApp />
            <div className='mt-10 flex px-32 '>
                {/* Status and article recommendation */}
                <div className='flex  flex-col w-full gap-10'>
                    <CreateStatus />
                    <UserStatus />
                    <div className='flex justify-between'>
                        <h1 className='font-bold text-4xl'>Article For You</h1>
                        <Link to={'/articles'}>
                            <p className='font-semibold'>View More</p>
                        </Link>     
                    </div>
                    <ListAllArticle />
                </div>
            </div>
        </div>
    )
}

export default Homepage