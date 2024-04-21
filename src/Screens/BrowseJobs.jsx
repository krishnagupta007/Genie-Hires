import React, {useState, useEffect} from 'react'
import Card from '../Components/Card'
import {useNavigate} from 'react-router-dom'

export const BrowseJobs = () => {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate("/")
    }

    // Fetching Data from Database
    const [JobData, setUserData] = useState([]);
    const [Records, setRecords] = useState(JobData);
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
            setRecords(Data)
        };
        fetchData();
    }, [] )
    const handleFilter = (event) => {
        setRecords(JobData.filter(job => job.jobTitle.toLowerCase().includes(event.target.value.toLowerCase()))) 
    }
    const handleLocation = (event) => {
        setRecords(JobData.filter(job => job.location.toLowerCase().includes(event.target.value.toLowerCase()))) 
    }

    const handleMoreFilters = () => {
        const MoreFiltersDiv = document.getElementById("MoreFilters");
        const HideFilters = document.getElementById("HideFilters");
        const MoreFilters = document.getElementById("LinkDetails");

        MoreFiltersDiv.style.display = "flex"
        HideFilters.style.display = "block"
        MoreFilters.style.display = "none"
    }

    const handleHideFilters = () => {
        const MoreFiltersDiv = document.getElementById("MoreFilters");
        const HideFilters = document.getElementById("HideFilters");
        const MoreFilters = document.getElementById("LinkDetails");

        MoreFiltersDiv.style.display = "none"
        HideFilters.style.display = "none" 
        MoreFilters.style.display = "block"
    }

    const generateUniqueData = (data, key) => {
        let UniqueValues = data.map((currEle) => {
            return currEle[key];
        });
        UniqueValues = [...new Set(UniqueValues)];
        return UniqueValues;
    }

    const Companies = generateUniqueData(JobData, "name");
    const Industry = generateUniqueData(JobData, "industry");
    const jobType = generateUniqueData(JobData, "jobType");
    const Location = generateUniqueData(JobData, "jobLocation");
    const Compensation = generateUniqueData(JobData, "compensation");
    // console.log(Companies);

    const handleOptionClick = (event) => {
        let selectedvalue = event.target.value;
        let name = event.target.name;

        if(selectedvalue !== "all"){
            setRecords(JobData.filter(job => job[name].toLowerCase().includes(selectedvalue.toLowerCase()))) 
            const clearFilter = document.getElementById("clearFilter")
            clearFilter.style.opacity = "100%"
        }
    }

    const handleClearFilter = () => {
        window.location.reload();
    }

    return (
        <>
        <div className="JobsNavbar">
            <img 
            id="SmallLeftLogo" 
            src="/Images/Logo.png" 
            alt=''
            onClick={handleNavigate}
            ></img>
            <div className='SearchBar'>        
                <img id="searchIcon" src='/Images/find.png' alt='Search'/>
                <input
                type='text'
                placeholder='Search Available Jobs'
                onChange={handleFilter}
                ></input>
                <img 
                id="locationIcon" 
                src='/Images/location.png' 
                alt='Location'
                />
                <input
                type='text'
                placeholder='Browse Locations'
                onChange={handleLocation}
                ></input>
            </div>

            <div className='UserDetails'>
                <h3 id="LinkDetails" onClick={handleMoreFilters}>More Filters ...</h3>
                <h3 id="HideFilters" onClick={handleHideFilters} style={{display: "none"}}>Hide Filters ...</h3>
            </div>
        </div>

        <div className='MoreFilters' id='MoreFilters'>
        <select onClick={handleOptionClick} name='name'>
            <option selected disabled hidden value="all">Companies</option>
            <optgroup label="Available Companies"> 
            {Companies.map((ele) => {
                return <option value={ele}>{ele}</option>
            })}
            </optgroup>
        </select>
        <select onClick={handleOptionClick} name='industry'>
            <option selected disabled hidden value="all">Industry</option>
            <optgroup label="Select Industry"> 
            {Industry.map((ele) => {
                return <option value={ele}>{ele}</option>
            })}
            </optgroup>
        </select>
        <select onClick={handleOptionClick} name='jobType'>
            <option selected disabled hidden value="all">Job Type</option>
            <optgroup label="Select Job Type"> 
            {jobType.map((ele) => {
                return <option value={ele}>{ele}</option>
            })}
            </optgroup>
        </select>
        <select onClick={handleOptionClick} name='jobLocation'>
            <option selected disabled hidden value="all">Job Location</option>
            <optgroup label="Select Location Type"> 
            {Location.map((ele) => {
                return <option value={ele}>{ele}</option>
            })}
            </optgroup>
        </select>
        <select onClick={handleOptionClick} name='compensation'>
            <option selected disabled hidden value="all">Compensation</option>
            <optgroup label="Select Compensation"> 
            {Compensation.map((ele) => {
                return <option value={ele}>{ele}</option>
            })}
            </optgroup>
        </select>
        <div className='clearFilterDiv'>
            <h3 id="clearFilter" onClick={handleClearFilter} style={{opacity: "0%", cursor: 'pointer'}}>Clear Filters</h3>
        </div>
        </div>

        

        <div className='Cards'>
            {
                // eslint-disable-next-line
                Records != []
                ? Records.map((data) => {
                    return(
                        <>
                        <Card key = {data._id} 
                        id = {data._id}
                        name = {data.name}
                        email = {data.email}
                        location = {data.location}
                        image = {data.image}
                        industry = {data.industry}
                        companyDescription = {data.companyDescription}
                        jobTitle = {data.jobTitle}
                        jobType = {data.jobType}
                        jobLocation = {data.jobLocation}
                        compensation = {data.compensation}
                        jobDescription = {data.jobDescription}
                        externalURL = {data.externalURL}
                        ></Card>
                        </>
                    )
                })
                : ""
            }
        </div>
        </>
    )
}
