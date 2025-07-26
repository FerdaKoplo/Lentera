import React from 'react'
import NavLanding from './nav-landing'
import HeroLanding from './hero-landing'

const MainLanding = () => {
  return (
    <div  className='bg-[#FAFFFD]'>
        <NavLanding navlist={[]} onNavClick={function (sectionKey: string): void {
              throw new Error('Function not implemented.')
          } } />
          <HeroLanding />
    </div>
  )
}

export default MainLanding