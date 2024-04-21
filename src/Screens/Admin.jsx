import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Admin() {
    const navigate = useNavigate();
    const navigateHome = () => {
        navigate("/");
    }

    const [data, setData] = useState({ username: "", password: "" });

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };


    const handleAdminLogin = (e) => {
        e.preventDefault();
        if(!data.username && !data.password) toast.info("Please enter details to continue") 
        else {
            if(!data.password) toast.info("Password cannot be left empty")
            if(!data.username) toast.info("Username cannot be left empty")
        }

        if(data.username && data.password ){
            // eslint-disable-next-line
            if(data.username == process.env.REACT_APP_ADMIN && data.password == process.env.REACT_APP_PASSWORD){
                toast.success("Admin Login Success")
                setTimeout(() => {
                    localStorage.setItem("admin", process.env.REACT_APP_ADMIN_AUTH)
                    navigate("/adminPanel")
                    window.location.reload(true);
                }, 3000);
            } else {
                toast.warn("Please Login with correct credentials")
            }
        } 
    }

    return (
    <>
    <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="colored"
        />
    <img id="LeftLogo" src="/Images/Logo.png" alt="" onClick={navigateHome}></img>

    <div className='outerDiv'>
    <div className="adminForm">
        <form style={{width: "500px", marginTop: "3%"}}>
        <h1 id="maintext">Admin Log In</h1>

        <div className="inputbox" >
            <label htmlFor="email">Email</label>
            <input
            name="username"
            value={data.username}
            onChange={handleChange}
            type="text"
            placeholder="Enter your Username"
            ></input>
        </div>

        <div className="inputbox">
            <label htmlFor="password">Password</label>
            <input
            name="password"
            value={data.password}
            onChange={handleChange}
            type="password"
            placeholder="Enter your Password"
            minLength={5}
            maxLength={16}
            ></input>
        </div>

        <div className="inputbox" style={{marginTop: "7%"}}>
        <button id="loginbtn" onClick={handleAdminLogin}> Log In </button>        
        </div>
        </form>
    </div>
    </div>
    </>
    )
}
