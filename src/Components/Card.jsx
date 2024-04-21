import React from 'react';
import "../global.css";
import { useNavigate } from 'react-router-dom';

export default function Card(props) {
    const navigate = useNavigate();

    // const [showContent, setshowContent] = useState(true)

    const handleClick = () => {
        localStorage.setItem("id", props.id);
        navigate("/jobdetails");
    }

    return (
        <div className="Card" id={props.id} onClick={handleClick}>
            {
            // showContent 
            // ? (
            <>
            <div className='jobDetails'>
            <h1>{props.jobTitle}</h1>
            <h2 style={{marginTop: "-6%"}}>{props.name}</h2>
            <p>{props.location}</p>

            <div className='Tags'>
                <div className='Tag'><h4>{props.jobType}</h4></div>
                <div className='Tag'><h4>{props.jobLocation}</h4></div>
                <div className='Tag'><h4>{props.compensation}</h4></div>
            </div>
            </div>
            <div className="companyLogo">
            <div>
            <img src={props.image} alt=''></img>
            </div>
            </div>
            </> 
            // )
            // :
            // (
            //     <div className='fullDetails' style={{display:"none"}}>
            //         <h1>{props.jobTitle}</h1>
            //     </div>
            //     </>
            // ) 
            }
            
        </div>
    )
}
