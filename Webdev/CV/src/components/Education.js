import React from 'react'
import DCU from '../DCU.png';
import TUD from '../TUD.jpg';

function Education() {
  return (
    <div id="Education" className="container py-5">
      <h1 className="about-heading">Education</h1>
      <div className="row">
      <div className="border rounded rounded-3 border-3 border-dark col-lg-6 col-xm-12">
      <a href="https://www.tudublin.ie/">
            <img className="college rounded mx-auto d-block" src={TUD} alt="TUD logo" />
            </a>
            <div className="col"> 
            <br/>
            <h3 className="degree"><b>Technological University Dublin</b></h3>
            <h4 className="degree">MSc in Advanced Software Development</h4>
            <h5 className="degree">2020 - Present </h5>
            <p>I am currently working on my masters part time during the evening.</p>
            <p> Examples of modules passed : </p>
            <ul>
    <li>Software Design</li>
    <li>Programming Paradigms</li>
    <li>Web Applications Architectures</li>
    <li>Secure Systems Development</li>
    <li>Systems Architectures</li>
    <li>Scientific Research</li>
</ul>

</div>
</div>
<div className="border rounded rounded-3 border-3 border-dark col-lg-6 col-xm-12">
<a href="https://www.dcu.ie/">
            <img className="college rounded mx-auto d-block" src={DCU} alt="DCU logo" />
            </a>
            <div className="col"> 
            <br/> 
            <h3 className="degree"><b>Dublin City University</b></h3>
            <h4 className="degree">B.Sc. Enterprise Computing </h4>
            <h5 className="degree">2015 - 2019 </h5>
            <p>Graduated with First Class Honours</p>
            <p> Examples of modules passed : </p>
            <ul>
    <li>Web Programming + Design</li>
    <li>Python Programming</li>
    <li>Networks and Internet</li>
    <li>Database Management</li>
    <li>Software Testing</li>
    <li>Cloud Computing</li>
</ul>
</div>
</div>
</div>
</div>
  )
}

export default Education
