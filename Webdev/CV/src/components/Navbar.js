import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-scroll";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container">

        <Link smooth={true} to="" className="navbar-brand" href="#"></Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <FontAwesomeIcon icon={faBars} style={{ color: "black"}} />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ms-auto">
    <li className="nav-item">
        <Link smooth={true} to="Home" className="nav-link" href="#">Home</Link>
      </li>
      <li className="nav-item">
        <Link smooth={true} to="About" offset={-100} className="nav-link" href="#">About</Link>
      </li>
      <li className="nav-item">
        <Link smooth={true} to="Experience" offset={-90} className="nav-link" href="#">Experience</Link>
      </li>
      <li className="nav-item">
        <Link smooth={true} to="Education" offset={-100} className="nav-link" href="#">Education</Link>
      </li>
      <li className="nav-item">
        <Link smooth={true} to="Contact" offset={-100} className="nav-link" href="#">Contact</Link>
      </li>

          </ul>

        </div>

      </div>
    </nav>
  )
}

export default Navbar
