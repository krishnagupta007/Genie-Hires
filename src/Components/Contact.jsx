import React from 'react';
import {useNavigate} from 'react-router-dom';
import { Footer } from './Footer';

export default function Contact() {
    const navigate = useNavigate();
    return (
        <>
        <div className='main' style={{marginTop: "3%", marginBottom: "-3%"}}>
        <img 
        id="centerLogo" 
        src="/Images/Logo.png" 
        alt=''
        onClick={() => navigate("/")}
        ></img> 

        <br/><br/><br/>

        <div className='sub'>
            <img src='/Images/GenieSmoke.png' alt='' style={{width: "40%"}}></img>
            <div style={{width: "50%", marginLeft: "100px"}}>
            <h1 style={{fontSize: "40px"}}>Rub the Lamp to have us by your side. Just Kidding !!!</h1>
            <h2> Genie hire is a job management site which is developed with the aim to bridge the gap between the recruiters and the candidates making it a fair place to grab opportunities 
                The platform enables users to list new job posts, apply for positions, and manage the hiring process, providing a user-friendly interface for efficient job management.
            </h2>
            </div>
        </div>

        <br/><br/><br/><br/>

        <div className='subGold'>
            <div style={{width: "50%", marginRight: "180px"}}>
            <h1 style={{fontSize: "40px"}}>Tribute to the who really made it happen !!!</h1>
            <h2> Developers have made the site secure with the use of various techniques like hashing to prevent any kind of server breach or cyber attacks like SQL injection, Cross Site Scripting attacks, etc.
            Genie Hire aims to make the job search and hiring process more efficient and effective for all parties involved keeping in mind the security of its users too.
            </h2>
            </div>
            <img src='/Images/GoldGenie.png' alt='' style={{width: "40%"}}></img>
        </div>
        <br/><br/><br/>
        <Footer/>
        </div>
        </>

    )
}
