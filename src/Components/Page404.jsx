import React from 'react'
import {useNavigate} from 'react-router-dom';

export default function Page404() {
    const navigate = useNavigate();
    return (
        <>
        <div className='main'>
        <img id="centerLogo" src="/Images/Logo.png" alt=''></img>

        <div style={{width: "150%",display: "flex", alignItems: "center", justifyContent: "space-around", marginTop:"5%"}}>
            <div style={{width: "45%", marginTop: "5%"}}>
            <h1><u> Page Not Found </u></h1> 
            <h3> <br/>
                There seems to be a typo in the url.
                You might have mismatched what you're searching for through the website. No worries we got your back. <br/><br/>
                Click the button below to head back to Genie Hire's. Let's get you back to continue your search and fill the void for the BEST of BEST.<br/><br/>
            </h3>
            <button id='loginbtn' onClick={() => navigate("/")} style={{width: "70%"}}> Back to Genie Hire's </button>
            </div>
            <img src='/Images/BlueGenie.png' alt='' style={{filter: "drop-shadow(-5px -5px 20px rgba(173, 216, 230, 0.8))"}}></img>
        </div>
        </div>
        </>
    )
}