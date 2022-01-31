import React from 'react'
import { AiFillLinkedin } from 'react-icons/ai';
import { AiFillGithub } from 'react-icons/ai';
import {Link} from "react-scroll";

const Footer = () => {
    return (
        <div className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 cold-md6 col-sm-6">
                    <div className="d-flex">
                            <p>seanwilliams712@gmail.com</p>
                        </div>
                        <div className="d-flex">
                            <p>Dublin, Ireland</p>
                        </div>
                        <div className="d-flex">
                            <p>This website has been created by me with React.</p>
                        </div>
                    </div>
                    <div className="col-lg-3 cold-md2 col-sm-6">
                    <div className="row">
                    <div className="col">
                    <Link smooth={true} to="Home" className="footer-nav" href="#">Home</Link>
                        <br />
                        <Link smooth={true} to="About" offset={-100} className="footer-nav" href="#">About</Link>
                        <br />
                        <Link smooth={true} to="Experience" offset={-100} className="footer-nav" href="#">Experience</Link>
                </div>
                <div className="col">
                <Link smooth={true} to="Education" offset={-100} className="footer-nav" href="#">Education</Link>
                        <br />
                        <Link smooth={true} to="Contact" offset={-100} className="footer-nav" href="#">Contact</Link>
                </div>
            </div>
        </div>
        <div className="col-lg-5 col-md-5 col-sm-6 align-items-center">
            <div className="d-flex justify-content-center">
            <h1><a href="https://www.linkedin.com/in/sean-williams-834525140/"> <AiFillLinkedin  /> </a> </h1>
            <h1><a href="https://github.com/seandub13/Sean-Williams-Projects"> <AiFillGithub  /> </a> </h1>
                </div>
            </div>
            
        </div>
        </div>
        </div>
    )
}

export default Footer
