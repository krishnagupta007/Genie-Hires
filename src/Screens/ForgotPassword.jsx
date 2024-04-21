import React, {useState} from "react";
import "../Screens/ForgotPassword.css";
import "../global.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ForgotPassword = () => {
    const navigate = useNavigate();
    const navigateHome = () => {
        navigate('/');
    }

    const sendMail = async(e) => {
        e.preventDefault();

        if(!data.email) toast.info("Please Enter E-mail to reset your password")

        const response = await fetch("http://localhost:5000/api/otpRequest",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: data.email
            })
        });

        if (data.email && response.status === 400) toast.warn("No Such User Exists")
        if (data.email && response.status === 200) {
            toast.success("OTP Sent Successfully")
            document.getElementById("requestOTP").style.display = "none"
            document.getElementById("changePassword").style.display = ""
            document.getElementById("otp").disabled = false
            document.getElementById("newPassword").disabled = false
        }
    }

    const changePassword = async(e) => {
        e.preventDefault()

        if(!value) toast.info("OTP Field Cannot be empty");
        if(!data.newPassword) toast.info("Password Field Cannot be empty");

        if(data.newPassword && value){
        const response = await fetch("http://localhost:5000/api/passwordReset", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: {
                email: data.email,
                otp: value,
                newPassword: data.newPassword
            }
        })
        if (response.status === 200){
            toast.success("Password Updated Successfully");
            setInterval(() => {
                navigate("/login")
            }, 3000);
        } 
        if (response.status === 403) toast.success("Wrong OTP Entered")
        }
    }

    const [data, setData] = useState({
        email : "",
        newPassword: ""
    })

    const [value, setValue] = useState('');
    const handleChange = ({currentTarget :input}) => {
        setData({...data, [input.name]: input.value})
    }
    const handleOtp = (event) => {
        const inputValue = event.target.value;
        if (!isNaN(inputValue) && inputValue.length <= 6){
            setValue(inputValue);
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

        <div className="form">
            <h1 id="maintext" style={{marginTop: "7%"}}>Forgot Password ?</h1>

            <div className="inputbox">
                <label for="email">Email</label>
                <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your Email Address"
                value={data.email}
                onChange={handleChange}
                required
                ></input>
            </div>

            <div className="inputbox">
                <label htmlFor="password"> OTP Code </label>
                <input
                id="otp"
                name="otp"
                value={value}
                onChange={handleOtp}
                type="number"
                placeholder="Enter the OTP received"
                maxLength={6}
                disabled
                required
                ></input>
            </div>

            <div className="inputbox">
                <label htmlFor="password">New Password</label>
                <input
                id="newPassword"
                name="newPassword"
                value={data.newPassword}
                onChange={handleChange}
                type="password"
                placeholder="Enter your New Password"
                minLength={8}
                maxLength={16}
                disabled
                required
                ></input>
            </div>
            <input id="requestOTP" type="button" value=" Request OTP " onClick={sendMail}></input>
            <input id="changePassword" style={{display: "none"}} type="button" value=" Change Password " onClick={changePassword}></input>
        </div>
        </>
    );
};