import axios from 'axios';
import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {BrowserRouter,Link,Switch,Route} from 'react-router-dom'
import UserCart from './UserCart';
import ViewProduct from './ViewProduct';



export default function UserProfile(){


    //function to make post to usercart api
    const addProductToCart=(productObj)=>{
        //get username from localstorage
        let username=localStorage.getItem("username")
        //add username to product object
        //productObj.username=username;
        let newObj={username,productObj}

        console.log("Product added by user is",newObj)

        //make post req
        axios.post("/user/addtocart",newObj)
        .then(res=>{
            let responseObj=res.data;
            alert(responseObj.message)
        })
        .catch(err=>{
            console.log("Error in adding to cart",err)
            alert("Something went wrong")
        })
    }



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
            <BrowserRouter>
                <div className="text-center">
                    <button type="submit" className="btn btn-info ms-5 mt-3">
                        <Link className="nav-link text-dark " to="/viewproduct">View Products</Link>
                    </button>
                    <button type="submit" className="btn btn-success ms-5 mt-3">
                        <Link className="nav-link text-white" to="/usercart">Cart</Link>
                    </button>
                 </div>

                <Switch>
                    <Route path="/viewproduct">
                        <ViewProduct/>
                    </Route>
                    <Route path="/usercart">
                        <UserCart/>
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    )
}