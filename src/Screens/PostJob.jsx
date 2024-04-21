import React from "react";
import '../Screens/PostJob.css'
import { useNavigate } from "react-router-dom";

export const PostJob = () => {

const navigate = useNavigate();
const navigateHome = () => {
    navigate('/')
}

const navigateJobDetails = () => {
    navigate('/postjob/jobdetails')
}

return (
    <>
    <body>
        <nav className="postjobnav">
        <img
            id="CenterLogo"
            src="/Images/Logo.png"
            alt=""
            onClick={navigateHome}
        ></img>
        </nav>
        <div className="maindiv">
        <div className="leftdiv">
            <h1> Post a Job !!!</h1>
            <p>
            Genie Hire’s is a free platform for recruiters to post various
            types of jobs and hire potential candidates as per their
            requirements
            </p>

            <p>
            Recruiters get ready to get the best out of the rest for their
            requirements, Be it small businesses, startups, MNCs, and many
            more all at one place
            </p>

            <button onClick={navigateJobDetails}> Start Hiring !!! </button>
        </div>
        <div className="rightdiv">
            <img src="/Images/GoldGenie.png" alt=""></img>
        </div>
        </div>
    </body>
    </>
);
};
