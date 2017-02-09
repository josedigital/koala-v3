import React from 'react'

import './Dashboard.css';
import Koala from './img/Koala.png'
import bgimg from './img/main-bg.jpg'
let bgstyles = {
  backgroundImage: 'url('+bgimg+')'
}

const Header = () => {
  return (
    <div>
      <div className="Background-image" style={bgstyles}></div>
      <div className="Page-wrap">
        <header className="Header">
          <div className="Grid middle container">
            <div className="Cell six Brand">
              <div className="Grid">
                <div className="Cell one"><img src={Koala} alt="" /></div>
                <div className="Cell"><h1 className="uppercase">Koala</h1></div>
              </div>              
            </div>
          </div>
        </header>
      </div>
    </div>
 ) 
}

export default Header
