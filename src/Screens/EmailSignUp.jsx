import React, { useState } from "react";
import "../Screens/EmailSignUp.css";
import "../global.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const EmailSignUp = () => {
const navigate = useNavigate();
const navigateHome = () => {
    navigate("/");
};

const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    password: ""
});

const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
};

const handleSubmit = async (e) => {
    e.preventDefault();

    // Handle Validations
    if (!data.name) toast.info("Please Enter Your Name")
    if (!data.username) toast.info("Please Enter Your Username")
    if (!data.email) toast.info("Please Enter Your Email")
    if (!data.password) toast.info("Please Enter Your Password")

    // Email Validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (data.email && !re.test(data.email) ){
        toast.warn("Please Enter a Valid Email Address")
    } 

    if(!document.getElementById("t&c").checked) toast.warn("Please Accept our Terms of Service before Proceeding")
    else {
        const url = await fetch("http://localhost:5000/api/createuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: data.name,
                username: data.username,
                email: data.email,
                password: data.password,
            }),
        });
        
        const credentials = await url.json();
        // await url.json();
    
        if(url.status === 400) toast.warn("Email Address Already Exists")
        if(data.password && url.status === 401) toast.warn("Password should be 8 characters long")
    
        if(url.status !== 401 && url.status === 201) {
            toast.success("Account Created Successfully")
            localStorage.setItem("name", credentials.name)
            setTimeout(() => {
                navigate("/login")
            }, 5000);
        }
    // console.log(credentials);
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
    <div className="emailsignup">
        <form onSubmit={handleSubmit}>
        <h1>Sign Up to Genie Hire’s</h1>

        <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="colored"
        />

        <div id="nameusername">
            <div className="inputbox">
            <label htmlFor="name">Name</label>
            <input
                name="name"
                value={data.name}
                onChange={handleChange}
                type="text"
                placeholder="Enter Your Name"
                required
            ></input>
            </div>

            <div className="inputbox">
            <label htmlFor="username">Username</label>
            <input
                name="username"
                value={data.username}
                onChange={handleChange}
                type="text"
                placeholder="Enter Your Username"
                required
            ></input>
            </div>
        </div>

        <div className="inputbox">
            <label htmlFor="email">Email</label>
            <input
            name="email"
            type="email"
            placeholder="Enter your Email Address" 
            pattern="[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            required
            value={data.email}
            onChange={handleChange}
            ></input>
        </div>
        <div className="inputbox">
            <label htmlFor="password">Password</label>
            <input
            name="password"
            type="password"
            placeholder="Enter your Password"
            minLength={8}
            maxLength={16}
            value={data.password}
            onChange={handleChange}
            required
            ></input>
            <p id="reqchara"> 8+ Characters Required </p>
        </div>

        <div className="checkboxlabel">
            <input 
            id="t&c" 
            type="checkbox"
            required
            ></input>
            <label htmlFor="t&c">
            I agree with Genie Hire’s Terms of Service, Privacy Policy, and
            default Notification Settings.
            </label>
        </div>

        <div className="inputbox">
            <button id="loginbtn" onClick={handleSubmit} type="submit">Sign Up</button>
            <Link to="/login" id="signupLink">
            Already Have An Account? Log In Instead
            </Link>
        </div>
        </form>
    </div>
    </>
);
};
