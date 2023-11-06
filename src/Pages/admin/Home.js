import React from 'react'

import Nav from './Nav'
import MajorList from './MajorList'


function Home({ Toggle }) {
    return (
        <div className='px-3'>
            <Nav Toggle={Toggle} />
            <MajorList />
        </div >)
}
export default Home