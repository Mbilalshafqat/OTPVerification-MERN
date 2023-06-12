import React, { useState } from 'react';
import "./Account.css"
import { useNavigate } from 'react-router-dom';

const Registration = () => {
    const [loading , setLoading] = useState(false)
    const [show,setSow] = useState(false)
    const [otp,setotp] = useState("")
    const [userdata,setData] = useState({
        username : "",
        email : "",
        password : ""
    })
    const InputDataChange = (e)=>{
        const { name, value } = e.target;
        setData({
          ...userdata,
          [name]: value,
        });

    }
    const navigate = useNavigate()
    const GetOTP = async()=>{
        setLoading(true);
        const res = await fetch("http://localhost:4000/user/otpVerification",{
            method : "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                username : userdata.username,
                email : userdata.email,
                password : userdata.password
            })
        });
        setLoading(false)
        const data = await res.json();
        if(res.status === 400){
            return alert(data.message)
        }else{
            alert(data.message)
            setSow(true)
        }
    }
    const submitdata = async()=>{
        setLoading(true);
        const res = await fetch("http://localhost:4000/user/CreateUser",{
            method : "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                username : userdata.username,
                email : userdata.email,
                password : userdata.password,
                OTP: otp
            })
        });
        setLoading(false)

        const data = await res.json();
        if(res.status === 400){
            return alert(data.message)
        }else{
            alert(data.message)
            setSow(false)
            navigate("/login")
        }
    }
  return (
   <>
   {
    loading ? "loading" : 
     <div className='registration'>
    <div className='r_child'>
    {
        !show ? <>
        <h1>Registration</h1>
    <input type='text' placeholder='UserName' name="username"
                      value={userdata.username}
                      onChange={InputDataChange}/>
    <input type='email' placeholder='Email Adress' name="email"
                      value={userdata.email}
                      onChange={InputDataChange}/>
    <input type='text' placeholder='Password' name="password"
                      value={userdata.password}
                      onChange={InputDataChange}/>
    <button onClick={GetOTP}>Get OTP</button> 
        </> : ""
    }
    {
        show && <>

<input type='text' placeholder='OTP' name="otp"
                      value={otp}
                      onChange={(e)=> setotp(e.target.value)}/>
    <button onClick={submitdata}>Registration</button>
        </>
    }
    </div>

    
    </div>
   }
   </>
  )
}

export default Registration