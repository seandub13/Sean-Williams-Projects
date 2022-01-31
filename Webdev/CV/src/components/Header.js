import React from "react";
import Typed from "react-typed";
import {Link} from "react-scroll";


const Header = () => {
  return (
    <div id="Home" className="header-wraper">
      <div className="main-info">
        <canvas></canvas>
        <h1>Welcome to my cv </h1>
        <br/>
        <h3>
        <Typed
                    strings={['Hi, my name is Sean Williams. I am a ']}
                    typeSpeed={40}
                    showCursor={false}
                />
                </h3>
                <br/>
                <h2 class="font-weight-bold">
        <Typed
          className="typed-text"
          strings={["Web Developer", "React Enthusiast","Angular Developer","Java Programmer",  "Basketball Lover", "Teacher", "Nerd","UI/UX Designer", "Esports Fan"]}
          typeSpeed={60}
          backSpeed={60}
          startDelay={2500}
          backDelay={1000}
          loop
  

        />
        </h2>
        <Link smooth={true} to="Contact"  className="btn-main-offer">contact me</Link>
      </div>
    </div>
  )
}

export default Header;
