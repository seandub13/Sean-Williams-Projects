import React from "react";
import Selfie from '../bus-selfie.jpg';

const AboutMe = () => {
  return (
    <div id="About" className="container py-5">
      <div className="row">
        <div className="col-lg-6 col-xm-12">
          <h1 className="about-heading">about me</h1>
          <p>
          Hi, I am Sean Williams, a web developer located in Dublin, Ireland.
          I created this website as an interactive way of getting to know me and to showcase some of my programming skills.
          I have been programming for over 10 years, which started when I picked up a 300 page book that taught you how to make websites and have been developing ever since.
          I have amassed an extensive amount experience in different programming languages such as Java, Python, Angular, Javascript, C++, Haskell and have working knowledge of many more.
          I studied Enterprise Computing at Dublin City University, graduating in 2019 with a First Class Honours Bachelor's Degree and I am in the process of obtaining my Masters Degree from Technological University Dublin in Advanced Software Development.
          I joined AIG after college as part of a rotation program that allowed me to work with different aspects of software development. The experiences I had on the different teams and projects prepared me to work as a full stack developer.
          As well as that, some of my hobbies include teaching, basketball and esports.
          If I had to describe myself, the best way would be that I am big nerd who loves American sports, who wants to create interesting and useful web applications.
          I'm always open to anybody that wants to talk job opportunites, emerging technologies or NBA results so please dont be shy and reach out to me.
          
          </p>
        </div>
        <div className="col-lg-6 col-xm-12">
          <div className="photo-wrap mb-5 ">
            <img className="profile-img" src={Selfie} alt="Picture of me" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutMe
