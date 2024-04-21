import React, {useState, useEffect} from 'react'
import parse from 'html-react-parser';
import { JobsNavbar } from '../Components/JobsNavbar';

export const FullDetails = () => {
    const [JobData, setUserData] = useState([]);
    useEffect(() => {
        const fetchData = async() => {
            let Data = await fetch("http://localhost:5000/api/displayJobs", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            Data = await Data.json();
            console.log(Data);
            setUserData(Data);
        };
        fetchData();
    }, [] )

    for (let i = 0; i < JobData.length; i++) {
    if(JobData[i]._id === localStorage.getItem("id")){   
        const handleApplications = () => {
            window.location.href = JobData[i].externalURL;
        }

        return (
        <>
        <JobsNavbar/>
        
        <div className='fullDetails'>
            <div className='bigThree'>
                <h1 style={{marginTop: "-7%"}}>{JobData[i].jobTitle}</h1>
                <h2 style={{marginTop: "-7%"}}>{JobData[i].name}</h2>
                <p style={{marginTop: "-7%"}}>{JobData[i].location}</p>
            </div>

            <img
            src={JobData[i].image}
            alt=''
            ></img>  
        </div>

        <div className='Description'>
            <h1 style={{marginBottom: "-2%"}}> About the Company </h1>
            <h3 id='compDesc'>
                {parse(JobData[i].companyDescription)}
            </h3>

            <h1 style={{marginBottom: "-2%"}}> Complete Job Description </h1>
            <h4>
                {parse(JobData[i].jobDescription)}
            </h4>
        </div>

        <div className="ApplyNow">
        <button id="loginbtn" onClick={handleApplications}> Apply Now </button>
        </div>
        </>
        );
    }
    }
}
