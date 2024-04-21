import React from 'react';
import {useNavigate} from 'react-router-dom';
import { Footer } from './Footer';

export default function About() {
    const navigate = useNavigate();
    return (
        <>
        <div className='main' style={{marginTop: "3%", marginBottom: "-10%"}}>
        <img 
        id="centerLogo" 
        src="/Images/Logo.png" 
        alt=''
        onClick={() => navigate("/")}
        ></img> 

        <br/><br/><br/>

        <div className='sub'>
            <img src='/Images/BlueBody.png' alt='' style={{width: "40%"}}></img>
            <div style={{width: "50%", marginLeft: "180px"}}>
            <h1 style={{fontSize: "40px"}}>Genie Here to Fulfill your wishes</h1>
            <h2>Genie Hire’s is a job management website that offers basic functionalities for hiring, listing new posts, and getting hired. It is designed to streamline the process of finding and applying for job opportunities. Genie hire’s gives advantage to the recruiter in finding the perfect candidate that fits the job role keeping in mind the requirements and necessary qualifications </h2>
            </div>
        </div>

        <br/><br/><br/>

        <div className='sub'>
            <div style={{width: "50%", marginRight: "150px"}}>
            <h1 style={{fontSize: "40px"}}>Get the BEST of the BEST Opportunities</h1>
            <h2>Genie hire’s gives candidates the freedom to select job roles from the listed companies based on their interests, needs, wants and much more. The platform is a free to use application where the user can browse jobs according to their requirements at time and apply to them keeping in mind the various type of information available to the user that will be provided to them by the recruiters as they post a new job requirement, which will include type of job, location of job, type of job, minimum requirements and perks that will be provided to the employee after joining</h2>
            </div>
            <img src='/Images/GenieLeftTilt.png' alt='' style={{width: "40%"}}></img>
        </div>

        <br/><br/><br/>

        <div className='sub'>
            <img src='/Images/GoldBody.png' alt='' style={{width: "40%"}}></img>
            <div style={{width: "50%", marginLeft: "150px"}}>
            <h1 style={{fontSize: "40px"}}>Genie Never Loses to Deliver</h1>
            <h2>This platform provides basic functionalities to list jobs by recruiters and specifying the requirements and based on all the information listed, candidates can view the job roles and responsibilities and moreover get a rough view about what needs to be done after joining the job by referring to the job description posted by the recruiters.</h2>
            </div>
        </div>

        <button 
        id='loginbtn' 
        style={{marginTop: "10%",marginBottom: "10%", width: "70%"}} 
        onClick={() => navigate("/")}
        > 
        Get Started !!! 
        </button>

        <Footer></Footer>
        </div>
        </>

    )
}
