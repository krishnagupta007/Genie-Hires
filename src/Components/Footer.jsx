import React from 'react'

export const Footer = () => {
    return (
        <>
        <div className='sub' style={{display: "grid",backgroundColor: "black", borderRadius: "20px 20px 0px 0px", width: "185%"}}>
            <div style={{width: "50%", marginLeft: "180px", color: "white"}}>
            <h1 style={{fontSize: "40px"}}>Aabra Kadabara</h1>
            <h2> Follow the below links to contact us !!! We at Genie Hire's make the best out of resources to provide a sustainable and secure platform to list and find opportunities.</h2>
            </div>
        <div className='socialLogos'>
            <div style={{width: "60%", display:"flex", alignItems:"center"}}>
                <img src='/Images/SocialLogos/linkedin.png' alt='' onClick={() =>  window.location.href = "https://www.linkedin.com/in/krishna-gupta-4520b2254/"}></img>
                <img src='/Images/SocialLogos/instagram.png' alt='' onClick={() =>  window.location.href = "https://www.instagram.com/krishna._.gupta04/"}></img>
                <img src='/Images/SocialLogos/github.png' alt='' onClick={() =>  window.location.href = "https://github.com/krishnagupta007"}></img>
            </div>
            <div className='copyright'>
                <h3 style={{cursor: "pointer"}}>© Genie Hire's</h3>
            </div>
        </div>

        </div>
        </>
    )
}
