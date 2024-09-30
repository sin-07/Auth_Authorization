import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import AuthContext from '../context/AuthContext';
axios.defaults.withCredentials = true;



const Profile = () => {
    let firstRender = true;

    const {user ,setUser}= useContext(AuthContext);

    const refreshToken = async () => {
        const res = await axios.get("http://localhost:5000/api/refresh",{
            withCredentials:true
        });

        const data = await res.data;
        setUser(data.message);
    }
    
    
    const sendRequest = async () => {
        const res = await axios.get("http://localhost:5000/api/users",{
            withCredentials:true
        });

        const data = await res.data;
        setUser(data.message);

    }
    
    useEffect(()=>{
        if(firstRender){
            firstRender = false;
            refreshToken();

        }
        let interval = setInterval(()=>{
            refreshToken();
        }, 60000);
        
        // sendRequest();
    })
    
    
  return (
    <>
    <div>
        {
            user ? <h1>Hello {user.name}</h1> : <h1>Loading...</h1>
        }
    </div>

    <button>
        logout
    </button>
    </>

    
  )
}

export default Profile