import React from 'react'
import { useNavigate } from 'react-router-dom'

export const JobsNavbar = () => {

    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate("/")
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

            {/* <div className='SearchBar'>        
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
                ></input>
            </div> */}

            {/* <div className='UserDetails'>
                <h2>Krishna Gupta</h2>
            </div> */}
        </div>
        </>
    )
}
