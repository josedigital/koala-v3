import React from 'react'
import Login from '../../shared/components/Login'

import './LandingPage.css'
import Splashimg from './img/splash1.jpg'
import KoalaShadow from './img/Koala-shadow.png'
import PlaceHolderImg from './img/placeholder-screenshot.png'
let lpStyles = {
  background: 'url('+Splashimg+') no-repeat'
}
// import VideoWebm from './img/splash1.webm'
// import VideoMov from './img/splash1.mov'

const LandingPage = ({auth}) => {
  return (
    <div>
      <div className="Landing">
      <video playsinline autoPlay muted loop poster={Splashimg} className="Landing__video" styles={lpStyles}>
        <source src="https://josedigital.github.io/koala-site/img/splash1.webm" type="video/webm" />
        <source src="https://josedigital.github.io/koala-site/img/splash1.mov" type="video/mp4" />
      </video>
      <div className="container">
        <div className="Grid center">
          <div className="Cell six Landing__logo">
            <img src={KoalaShadow} alt="Koala app" />
            <h1 className="uppercase">Koala</h1>
            <p>
              Koala works to help you find new job opportunities and manage the details for the jobs you are interested in pursuing
            </p>
            <Login auth={auth} buttonText={'Get Started'} />
            <a href="#Works" className="button">How it Works</a>
          </div>
        </div>
      </div>
    </div>




    <div className="Works" id="Works">
      <h2 className="uppercase text-center">How it Works</h2>
      <div className="container">
        
        <div className="Search Grid Feature middle">
          <div className="Cell six">
            <img src={PlaceHolderImg} alt="" data-aos="fade-right" data-aos-anchor-placement="top-center" />
          </div>
          <div className="Cell six">
            <h3 className="uppercase">Search Jobs</h3>
            <p>
              Koala’s built-in job search engine takes the hassle out of going to different sites to search for jobs. Browsing the latest job posting from the largest career sites could not be easier.
            </p>
          </div>
        </div>

        <div className="Save Grid Feature middle">
          <div className="Cell six">
            <h3 className="uppercase">Save Jobs</h3>
            <p>
              The ability to add any job you find to your personal job management system is why Koalas was built. You can add and remove an unlimited number of jobs to your system and manage them any way you want.
            </p>
          </div>
          <div className="Cell six">
            <img src={PlaceHolderImg} alt="" data-aos="fade-left" />
          </div>
        </div>

        <div className="Keep Grid Feature middle">
          <div className="Cell six">
            <img src={PlaceHolderImg} alt="" data-aos="fade-right" />
          </div>
          <div className="Cell six">
            <h3 className="uppercase">Keep Notes</h3>
            <p>
              Notes are designed to help you keep track of the jobs in your system. Want a note to remind you what day you applied for this job, who you spoke to on your phone interview, what you need to study before your in-person interview? Koala is here to help.
            </p>
          </div>
        </div>
      </div>
    </div>



    <div className="End">
      <div className="Background-image--end"></div>
      <div className="container">
        <div className="Grid center">
          <div className="Cell six">
            <h3 className="text-center">Land your job</h3>
            <p>
              Now that you have a better idea of how Koala works, lets get you on the path to success.
            </p>
            <p className="text-center">
              <Login auth={auth} buttonText={'Get Started'} />
            </p>
          </div>
        </div>
      </div>
    </div>


    <footer>
      <div className="container">
        <div className="Grid">

          <div className="Cell two">
            <h3 className="uppercase">KOALA</h3>
            <ul>
              <li><a href="">Our Story</a></li>
              <li><a href="">Advertise</a></li>
              <li><a href="">FAQ</a></li>
              <li><a href="">Contact Us</a></li>
            </ul>
          </div>

          <div className="Cell fill">
            <h3>About Us</h3>
            <p>
              As graduating coding bootcamp students, the next hurdle is the job finding process. Visting every job search engine you can find, writing notes here and there, forgetting your notebook at home, your bookmarks are an unorganized mess of jobs, and any other unpleasant scenario. So here we are, building efficiency in the job finding process because we all need more time to console errors.
            </p>
          </div>


        </div>
      </div>
    </footer>




    </div>
  )
}

export default LandingPage
