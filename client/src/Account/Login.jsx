import React, { useState } from 'react';
import "./Account.css"
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [loading , setLoading] = useState(false)
    const [userdata,setData] = useState({
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
        const res = await fetch("http://localhost:4000/user/login",{
            method : "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
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
            localStorage.setItem("name", data.IsUser.username)
            navigate("/home")
        }
    }
   
  return (
   <>
   {
    loading ? "loading" : 
     <div className='registration'>
    <div className='r_child'>
  
        <h1>Login tp your account</h1>
    <input type='email' placeholder='Email Adress' name="email"
                      value={userdata.email}
                      onChange={InputDataChange}/>
    <input type='text' placeholder='Password' name="password"
                      value={userdata.password}
                      onChange={InputDataChange}/>
    <button onClick={GetOTP}>Login</button> 
        
    
    </div>

    
    </div>
   }
   </>
  )
}

export default Login