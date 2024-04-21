import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import "../Screens/Home.css";
import "../global.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Home = () => {
    const navigate = useNavigate();
    const login = () => {
        navigate('/login');
    }
    const signup = () => {
        navigate('/signup');
    }
    const jobpost = () => {
        navigate('/postjob');
    }
    const findjob = () => {
        navigate('/jobs')
    }

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        toast.success("Log Out Success");
        setInterval(() => {    
            window.location.reload();
        }, 3000);
    }

    const handleJobs = () => {
        if(localStorage.getItem("authToken")) navigate("/jobs")
        else navigate("/signup")
    }

    return (
        <>
        <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="colored"
        />
        <nav className='homenav'>
            <div className='navLeft'>
                <Link to='https://www.notion.so/Genie-Hire-s-Documentation-1755d12b17f848538702f5ced1622bdf'>Documentation</Link>
                <Link to='/contact'>Contact</Link>
                <Link to='/about'>About</Link>
            </div>

            <img id="CenterLogo" src="/Images/Logo.png" alt=''></img>

            {
            localStorage.getItem("authToken")
            ? 
            <div className='button' style={{justifyContent: "space-evenly"}}>
                <button onClick={jobpost} id="postjob"> Post Job </button> 
                <button onClick={findjob} id="postjob"> Find Job </button> 
                <button onClick={handleLogout}> Log Out </button>
            </div>
            :
            <div className='button'>
                <button onClick={findjob} id="postjob"> Find Job </button>
                <button onClick={login}> Log In </button>
                <button onClick={signup}> Sign Up</button>
            </div>
            }
        </nav>

        <div className='Home'>
            <div style={{marginTop: "-1%", marginBottom: "1%"}}>
            <h1> Your requirement is <br/> my command !!! </h1>
            <p> “If you are working on something that you really care about, you don’t have to be pushed. The vision pulls you.”
                <br/>Steve Jobs
            </p>
            </div>
            <button onClick={handleJobs}>Grant Wishes !!!</button>
        </div> 
        </>
    )
}
