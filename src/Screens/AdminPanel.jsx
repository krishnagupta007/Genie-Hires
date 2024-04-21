import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminPanel() {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate("/adminPanel");
    }

    // Fetching User Data from Database
    const [JobData, setJobData] = useState([]);
    useEffect(() => {
        const fetchData = async() => {
            let Data = await fetch("http://localhost:5000/api/displayJobs", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            Data = await Data.json();
            console.log("Jobs Data");
            console.log(Data);
            setJobData(Data);
        };
        fetchData();
    }, [] )

    // Fetching User Data from Database
    const [UserData, setUserData] = useState([]);
    useEffect(() => {
        const fetchData = async() => {
            let Data = await fetch("http://localhost:5000/api/displayUsers", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            Data = await Data.json();
            console.log("User Data");
            console.log(Data);
            setUserData(Data);
        };
        fetchData();
    }, [] )

    // Delete User
    const handleUserDelete = async(id, name) => {
        if(window.confirm(`Confirm Delete: ${name}`)){
            await fetch("http://localhost:5000/api/deleteUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userid : id
                })
            })
            .then((res) => res.json());
            toast.success(`${name} Deleted Successfully`)
        }
    }

    // Delete Job Post
    const handleJobDelete = async(id, company, jobTitle) => {
        if(window.confirm(`Confirm Delete: ${company} - ${jobTitle}`)){
            await fetch("http://localhost:5000/api/deleteJob", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    jobid : id
                })
            })
            .then((res) => res.json());
            toast.success(`${company} - ${jobTitle} Deleted Successfully`)
        }
    }

    // Low Level Login for displaying different contents to the user
    const JobDiv = document.getElementById("Cards");
    const UserDiv = document.getElementById("Users");
    
    const handleUserClick = () => {
        if(UserDiv.style.display === "none"){
            UserDiv.style.display = "";
            JobDiv.style.display = "none";
        }
    }

    const handleJobsClick = () => {
        if(JobDiv.style.display === "none"){
            JobDiv.style.display = "";
            UserDiv.style.display = "none";
        }
    }

    const handleLogOut = () => {
        if (localStorage.getItem("admin")) {
            localStorage.removeItem("admin")
            toast.success("Admin Log Out Success")
            setTimeout(() => {
                navigate("/admin")
                window.location.reload(true);
            }, 3000);
        }
    }

    return (
        <>
        <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="colored"
        />
        <div style={{display: "flex", alignItems: "center", justifyContent:"space-between", margin: "4%"}}>
            <h2 style={{width: "22%"}}> Hello, Admin !!!</h2>
            <img 
                src="/Images/Logo.png" 
                alt=''
                onClick={handleNavigate}
                style={{width: "16%", cursor: "pointer"}}
            ></img>
            <div style={{display: "flex", width: "22%", justifyContent: "space-between", alignItems: "center"}}>
            <h2 style={{cursor: "pointer"}} onClick={handleUserClick}>User</h2>
            <h2 style={{cursor: "pointer"}} onClick={handleJobsClick}>Jobs</h2>
            <button id='adminLogOut' onClick={handleLogOut}> Log Out </button>
            </div>
        </div>

        <div id='Users' className='Users'>
        <table width={"100%"}>
        <tbody>
            <tr>
                <th><h3>Name</h3></th>
                <th><h3>Username</h3></th>
                <th><h3>Email</h3></th>
                <th><h3>User Created Since</h3></th>
                <th width={"10%"}><h3>Delete User</h3></th>
            </tr>
            {
            // eslint-disable-next-line
            UserData != [] 
            ? UserData.map((data) => {
                return(
                    <tr id={data._id}>
                        <td><h3>{data.name}</h3></td>
                        <td><h3>{data.username}</h3></td>
                        <td><h3>{data.email}</h3></td>
                        <td><h3>{new Date(data.createdAt).toLocaleDateString("en-GB") + '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0' + new Date(data.createdAt).toLocaleTimeString("en-US")}</h3></td>
                        <td><img id="deleteIcon" src='/Images/delete.png' alt='' onClick={()=>handleUserDelete(data._id, data.name)}></img></td>
                    </tr>
                )
            })
            : ""
            }
        </tbody>
        </table>
        </div>

        <div id='Cards' style={{display: "none"}}>
        <table width={"100%"}>
        <tbody>
            <tr>
                <th width={"7%"}><h3>Logo</h3></th>
                <th><h3>Company</h3></th>
                <th><h3>Job Title</h3></th>
                <th><h3>Location</h3></th>
                <th><h3>Industry</h3></th>
                <th><h3>Posted At</h3></th>
                <th width={"10%"}><h3>Delete Job</h3></th>
            </tr>
            {
                // eslint-disable-next-line
                JobData != []
                ? JobData.map((data) => {
                    return(
                        <>
                        <tr>
                            <td><img src={data.image} alt='' style={{width: "40px", height: "40px", }}></img></td>
                            <td><h3>{data.name}</h3></td>
                            <td><h3>{data.jobTitle}</h3></td>
                            <td><h3>{data.location}</h3></td>
                            <td><h3>{data.industry}</h3></td>
                            <td><h3>{new Date(data.postedAt).toLocaleDateString("en-GB") + '\u00A0\u00A0\u00A0\u00A0\u00A0' + new Date(data.postedAt).toLocaleTimeString("en-US")}</h3></td>
                            <td><h3><img id="deleteIcon" src='/Images/delete.png' alt='' onClick={()=>handleJobDelete(data._id, data.name, data.jobTitle)}></img></h3></td>
                        </tr>
                        </>
                    )
                })
                : ""
            }
        </tbody>
        </table>
        </div>
        </>
    )
}
