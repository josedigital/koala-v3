import React from 'react'
import { Link } from 'react-router'

import './Dashboard.css';
import Koala from './img/Koala-head.png'
import bgimg from './img/main-bg.jpg'
let bgstyles = {
  backgroundImage: 'url('+bgimg+')'
}

const Header = ({auth, logout, profile, seeSearch, addJob}) => {
  return (
    <div>
      <div className="Background-image" style={bgstyles}></div>
      
        <header className="Header">
          <div className="Grid middle container">
            <div className="Cell six Brand">
              <div className="Grid">
                <Link to="/dashboard" className="Cell Grid">
                  <div className="Cell"><img src={Koala} alt="" /></div>
                  <div className="Cell"><h1 className="uppercase">Koala</h1></div>
                </Link>
              </div>              
            </div>
            <nav className="Cell six">
              <div className="Grid middle right">
                <div className="Cell">
                  <a href="" onClick={seeSearch}>New Search</a>
                </div>
                <div className="Cell">
                  <a href="" onClick={addJob}>Add a Job</a>
                </div>
                <div className="Cell">
                  {auth.loggedIn ? <a href='/' onClick={ () => logout() }>Logout</a> : ''}
                </div>
                <div className="Cell Profile">
                  <img src={profile.picture} className="Profile__img" alt="profile picture"/> 
                  <span className="Profile__name">hello, {profile.name} </span>
                </div>
              </div>
            </nav>
          </div>
        </header>
      
    </div>
 ) 
}

export default Header
