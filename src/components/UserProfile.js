import axios from 'axios';
import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ViewProduct from './ViewProduct';

export default function UserProfile(){

    let params=useParams();
    let [userObj,setUserObj]=useState({})

    useEffect(()=>{
        axios.get(`/user/getuser/${username}`)
        .then(res=>{
            userObj=res.data;
            setUserObj({...userObj.message})
        })

    },[])

    let username=params.username;

    return(
        <div className="text-center">
            <h3  className="text-success text-end">Welcome , {username} <img src={userObj.profileImage} width="20px" className="rounded-circle" alt="" /></h3>
            <h6 className="text-info text-end">{userObj.mail}</h6>
            <ViewProduct/>   
        </div>
    )
}