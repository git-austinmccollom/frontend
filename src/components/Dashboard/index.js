import React from 'react'
import './style.scss'

import CreatePost from '../CreatePost'
import SavedList from '../SavedList'
import Trending from '../Trending'

const Dashboard = (props) => {
  return (
    <div className='columnContainer'>
      <div className='dashboard'>
        <CreatePost />
        <SavedList />
      </div>
      <div className='sideBar'>
        <Trending />
      </div>
    </div>
  )
}

export default Dashboard
