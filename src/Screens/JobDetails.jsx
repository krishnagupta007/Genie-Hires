import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "quill/dist/quill.bubble.css";
import ReactQuill from "react-quill";

export const JobDetails = () => {
const navigate = useNavigate();

const navigateHome = () => {
    navigate("/");
};

const [selectedImage, setselectedImage] = useState(null)

const handleImageChange = async(event) => {
    let logo = document.getElementById('logo');
    const file = event.target.files[0];
    const reader = new FileReader();

    logo.src = URL.createObjectURL(file);

    reader.onloadend = () => {
        setselectedImage(reader.result)
    };

    if (await file) {
        reader.readAsDataURL(file);
    }
};

const [jobType, setjobType] = useState();
const handleJobType = (e) => {
    setjobType(e.target.value);
}

const [jobLocation, setjobLocation] = useState();
const handleJobLocation = (e) => {
    setjobLocation(e.target.value);
}

const [compensation, setcompensation] = useState();
const handleCompensation = (e) => {
    setcompensation(e.target.value);
}

const [Industry, setIndustry] = useState()
const handleIndustry = (industry) => {
    setIndustry(industry);
}

const [data, setData] = useState({
    name: "",
    email: "",
    location: "",
    industry: "",
    title: "",
    externalurl: "",
});

const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
};

const [value, setvalue] = useState("");
const handleDescription = (value) => {
    setvalue(value);
}

const [jobDescription, setjobDescription] = useState("");
const handleJobDescription = (jobDescription) => {
    setjobDescription(jobDescription);
}

var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['link'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],

    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    ['clean']                                         // remove formatting button
    ];
    const modules = {
        toolbar : toolbarOptions,
    }

const handleSubmit = async (e) => {
    e.preventDefault();

    const url = await fetch("http://localhost:5000/api/jobs", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        name: data.name,
        email: data.email,
        location: data.location,
        logoinput: selectedImage,
        industry: Industry,
        description: value,
        title: data.title,
        jobtype: jobType,
        jobloc: jobLocation,
        compensation: compensation,
        jobDescription: jobDescription,
        externalurl: data.externalurl
    })
    });

    const jobdetails = await url.json();
    console.log(jobdetails);

    if(url.status === 200) {
        navigate("/postjob/jobdetails");
    }
};

const handleKeyUp = () => {
    let industry = [
    "Aerospace & Defense",
    "Agriculture",
    "Arts, Entertainment & Recreation",
    "Construction, Repair & Maintenance Services",
    "Education",
    "Financial Services",
    "Food and Essentials Industry",
    "Government & Civil Services",
    "Healthcare",
    "Human Resources & Staffing",
    "Information Technology",
    "Insurance",
    "Legal",
    "Management & Consulting",
    "Manufacturing",
    "Media & Mass Communication",
    "Nonprofit & NGO",
    "Personal Consumer Services",
    "Pharmaceutical & Biotechnology",
    "Power, Mining & Utilities",
    "Real Estate",
    "Restaurants & Food Service",
    "Retail & Wholesale",
    "Telecommunications",
    "Tourism & Hospitality",
    "Transportation & Logistics",
    "Social Media"
    ];
    let sortedIndustry = industry.sort();
    let input = document.getElementById("industry");

    removeElements();

    for (let i of sortedIndustry) {
    if (
        i.toLowerCase().startsWith(input.value.toLowerCase()) &&
        input.value !== ""
    ) {
        let listElement = document.createElement("li");
        listElement.classList.add("list-items");
        listElement.style.cursor = "pointer";
        listElement.onclick = function () {
        input.value = this.textContent;
        removeElements();
        };
        let word = i.substring(0, input.value.length);
        word += i.substring(input.value.length);

        listElement.innerHTML = word;
        handleIndustry(word);
        document.querySelector(".list").appendChild(listElement);
    }
    }

    function removeElements() {
    let items = document.querySelectorAll(".list-items");
    items.forEach((item) => {
        item.remove();
    });
    }
};


return (
    <>
    <img
        id="LeftLogo"
        src="/Images/Logo.png"
        alt=""
        onClick={navigateHome}
    ></img>

    <div className="jobdetails">
        <form>
        <h1>Job Details</h1>
        <div id="nameusername">
            <div className="inputbox">
            <label htmlFor="name">Company Name</label>
            <input
                name="name"
                type="text"
                value={data.name}
                onChange={handleChange}
                placeholder="Enter Your Company's Name"
                required
            ></input>
            </div>
            <div className="inputbox">
            <label htmlFor="email">Email</label>
            <input
                name="email"
                type="text"
                value={data.email}
                onChange={handleChange}
                placeholder="Enter Your Company's Email"
                required
            ></input>
            </div>
        </div>
        <div className="inputbox">
            <label htmlFor="location">Location</label>
            <input
            name="location"
            type="text"
            value={data.location}
            onChange={handleChange}
            placeholder="Enter Your Company's Location"
            required
            ></input>
        </div>
        <div className="inputbox">
            <label htmlFor="companylogo">Company Logo</label>
        </div>

        <div className="companylogo">
            <div className="displaylogo"> 
                <img src="/Images/companyLogo.png" id="logo" alt="Company Logo"></img>
            </div>
            <input
            id="logoinput"
            name="logoinput"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{display: "none"}}
            ></input>
            <Link id="logoselect" onClick={ () => {
                const inputlogo = document.getElementById("logoinput");
                inputlogo.click();  
            }}>Select Company's Logo</Link>
        </div>
        <div className="inputbox">
            <label htmlFor="industry">Industry</label>
            <input
            name="industry"
            id="industry"
            type="text"
            placeholder="Select Industry"
            onKeyUp={handleKeyUp}
            required
            ></input>
            <ul className="list"></ul>
        </div>
        <div className="inputbox" style={{ marginTop: "-3%"}}>
            <label htmlFor="description">Company's Description</label>
            {/* <textarea
            id="description"
            name="description"
            type="text"
            value={data.description}
            onChange={handleChange}
            placeholder="Enter Your Company's Description"
            required
            ></textarea> */}
            <div id="description">
            <ReactQuill 
            id="TextEditor" 
            placeholder="Enter Company Description"
            modules={modules} 
            theme="bubble" 
            value={value} 
            onChange={handleDescription}
            />
            </div>
        </div>
        <div className="inputbox">
            <label htmlFor="title">Job Title</label>
            <input
            name="title"
            type="text"
            value={data.title}
            onChange={handleChange}
            placeholder="Enter Your Job's Title"
            required
            ></input>
        </div>
        <div className="inputbox">
            <label>Type of Job</label>
        </div>
        <div className="radiobutton">
            <div className="radiogroup">
            <input 
            name="jobtype" 
            value="Full Time"
            onChange={handleJobType} 
            type="radio"
            ></input>
            <label htmlFor="jobtype">Full Time</label>
            </div>
            <div className="radiogroup">
            <input 
            name="jobtype" 
            value="Part Time"
            onChange={handleJobType} 
            type="radio"
            ></input>
            <label htmlFor="jobtype">Part Time</label>
            </div>
            <div className="radiogroup">
            <input 
            name="jobtype"
            type="radio"
            value="Other"
            onChange={handleJobType}
            ></input>
            <label htmlFor="jobtype">Other</label>
            </div>
        </div>

        <div className="inputbox">
            <label>Job Location</label>
        </div>
        <div className="radiobutton">
            <div className="radiogroup">
            <input 
            name="jobloc" 
            type="radio"
            value="On-Site"
            onChange={handleJobLocation}
            ></input>
            <label htmlFor="jobloc">On-Site</label>
            </div>
            <div className="radiogroup">
            <input 
            name="jobloc" 
            type="radio"
            value="Remote"
            onChange={handleJobLocation}
            ></input>
            <label htmlFor="jobloc">Remote</label>
            </div>
            <div className="radiogroup">
            <input 
            name="jobloc" 
            type="radio"
            value="Hybrid"
            onChange={handleJobLocation}
            ></input>
            <label htmlFor="jobloc">Hybrid</label>
            </div>
        </div>

        <div className="inputbox">
            <label>Compensation Type</label>
        </div>
        <div className="radiobutton">
            <div className="radiogroup">
            <input 
            name="compensation" 
            type="radio"
            value="Hourly"
            onChange={handleCompensation}
            ></input>
            <label htmlFor="compensation">Hourly</label>
            </div>
            <div className="radiogroup">
            <input 
            name="compensation" 
            type="radio"
            value="Monthly"
            onChange={handleCompensation}
            ></input>
            <label htmlFor="compensation">Monthly</label>
            </div>
            <div className="radiogroup">
            <input 
            name="compensation" 
            type="radio"
            value="Other"
            onChange={handleCompensation}
            ></input>
            <label htmlFor="compensation">Other</label>
            </div>
        </div>

        <div className="inputbox">
            <label htmlFor="jobDescription">Job's Description</label>
            {/* <textarea
            id="jobDescription"
            name="jobDescription"
            type="text"
            value={data.jobDescription}
            onChange={handleChange}
            placeholder="Enter Job's Description"
            required
            ></textarea> */}
            <div id="description">
            {/* <p> Enter Job Description </p> */}
            <ReactQuill 
            id="TextEditor" 
            placeholder="Enter Job Description" 
            modules={modules} 
            theme="bubble" 
            value={jobDescription} 
            onChange={handleJobDescription}
            />
            </div>
        </div>

        <div className="checkbox" style={{ marginLeft: "5.5%" }}>
            <label>Receive Applications</label>
            <div className="innerCheckbox">
            <input 
            name="email" 
            id="email"
            type="checkbox"
            value="email"
            onClick={() => {
                const urlCheckbox = document.getElementById("url");
                urlCheckbox.checked = false;

                const urlDiv = document.getElementById("urlDiv");
                urlDiv.style.display = "none";
            }}
            ></input>
            <label htmlFor="email" id="main">
                Email
            </label>
            <p id="sub">Applications will be sent to your Company's email</p>
            </div>

            <div className="innerCheckbox">
            <input 
            name="url"
            id="url"
            type="checkbox"
            value="url"
            onClick={() => {
                const emailCheckbox = document.getElementById("email");
                emailCheckbox.checked = false;
                
                const urlCheckbox = document.getElementById("url");

                const urlDiv = document.getElementById("urlDiv");
                if(urlCheckbox.checked === false){
                    urlDiv.style.display = "none";
                } else {
                    urlDiv.style.display = "";
                }
            }}
            ></input>
            <label htmlFor="url" id="main">
                External URL
            </label>
            <p id="sub">Redirect applicants to External URL to Complete Application Process</p>
            </div>
        </div>
        <div className="inputbox" id="urlDiv" style={{display:"none", marginLeft:"3.5%"}}>
            <label htmlFor="externalurl">External URL</label>
            <input
            name="externalurl"
            type="text"
            pattern="https?://.+"
            value={data.externalurl}
            onChange={handleChange}
            placeholder="Enter Your Site's URL"
            ></input>
        </div>
        <div className="inputbox" style={{marginTop: "6%"}}>
            <button id="loginbtn" onClick={handleSubmit}>
                Post Job
            </button>
        </div>
        </form>
    </div>
    </>
);
};