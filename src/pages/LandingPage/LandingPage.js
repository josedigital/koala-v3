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
        {/*<source src={VideoWebm} type="video/webm" />
        <source src={VideoMov} type="video/mp4" />*/}
      </video>
      <div className="container">
        <div className="Grid center">
          <div className="Cell six Landing__logo">
            <img src={KoalaShadow} alt="Koala app" />
            <h1 className="uppercase">Koala</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas debitis mollitia nam, quas adipisci, sapiente, eos accusantium inventore est labore molestias, cupiditate obcaecati. Tempora eum aperiam repellat laboriosam, commodi perferendis.
            </p>
            <Login auth={auth}/>
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
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta, aliquid, saepe? Dicta eius neque consequuntur, praesentium provident at, ipsa ex non similique aut illum, quo suscipit reiciendis quasi ad! Soluta!
            </p>
          </div>
        </div>

        <div className="Save Grid Feature middle">
          <div className="Cell six">
            <h3 className="uppercase">Save Jobs</h3>
            <p>
              Expedita atque distinctio iusto esse, fugiat laudantium debitis explicabo neque pariatur veritatis eius magni minus quo ducimus autem blanditiis consequuntur, dignissimos deserunt omnis voluptatum minima nobis praesentium? Ex, itaque, fugit!
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
              Beatae voluptas, est minus voluptatibus magni nihil autem eum rerum porro fuga saepe nobis vero iure sapiente deserunt. Officiis provident soluta consectetur neque molestiae inventore,officia sunt. Id, doloremque, reiciendis!
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
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt nisi dolorum labore, asperiores, facilis aliquid accusantium eveniet officiis est blanditiis voluptatem deleniti aliquam neque, ut consequuntur fugiat aut? Eos, quis.
            </p>
            <p className="text-center">
              <a href="dashboard.html" className="button">Get Started!</a>
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
              <li><a href="">Link one</a></li>
              <li><a href="">Link two</a></li>
              <li><a href="">Link three</a></li>
              <li><a href="">Link four</a></li>
            </ul>
          </div>

          <div className="Cell fill">
            <h3>About Us</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet dolore perspiciatis eum. Possimus qui ullam, consectetur. Ex officia eius enim doloremque, voluptatibus eaque ea cupiditate, id, omnis nam vitae amet?
            </p>
          </div>


        </div>
      </div>
    </footer>




    </div>
  )
}

export default LandingPage
