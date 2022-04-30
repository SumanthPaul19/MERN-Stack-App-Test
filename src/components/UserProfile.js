import axios from 'axios';
import  { useEffect, useState } from 'react';
import {  useParams, useRouteMatch } from 'react-router-dom';
import {BrowserRouter,Link,Switch,Route, Redirect} from 'react-router-dom'
import UserCart from './UserCart';
import ViewProduct from './ViewProduct';
import ProductDetails from './ProductDetails';



export default function UserProfile(){

    let pathInfo=useRouteMatch();
    let url=useParams();
    let username=url.username;
    let[stateChange,setStateChange]=useState(true)
    let[userObj,setUserObj]=useState({});
    //let[product,setProduct]=useState([]);
    const [cartObj,setCartObj]=useState('');
    let [count,setCount]=useState(0);

    useEffect(()=>{
    
        let userObj=JSON.parse(localStorage.getItem("user"))
        setUserObj({...userObj})
        // let userObj=JSON.parse(localStorage.getItem("user"))
        // setUserObj({...userObj})
    },[username])
    

    const addProductToCart=(productObj)=>{
        let username=localStorage.getItem("username")

        let newObj={username,productObj}
        console.log(newObj)

        axios.post("/user/addtocart",newObj)
        .then(res=>{
            let responseObj=res.data;
            alert(responseObj.message)
            setStateChange(!stateChange)
            console.log(responseObj)
        })
        .catch(err=>{
            console.log("Error in adding to cart",err)
            alert("Something went wrong in adding to cart")
        })
    }

    

    useEffect(()=>{
        let username=localStorage.getItem("username")
        axios.get(`/user/getproducts/${username}`)
        .then(res=>{
            setCartObj(res.data.message)
            if(res.data.message!==null){
                setCount(res.data.message.products.length)
            }
            
        })
        .catch(err=>{
            console.log("Error on reading cart",err)
            alert("Something went wrong in getting cart")
        })
    },[stateChange])



    return(
        <div className="text-center">
            <h3  className="text-success text-end">Welcome , {username} <img src={userObj.profileImage} width="20px" className="rounded-circle" alt="" /></h3>
            <h6 className="text-info text-end">{userObj.mail}</h6>
            <BrowserRouter>
                <div className="text-center">
                    <button type="submit" className="btn btn-info ms-5 mt-3">
                        <Link className="nav-link text-dark " to="/viewproduct">View Products</Link>
                    </button>
                    <button type="submit" className="btn btn-dark ms-5 mt-3">
                        <Link className="nav-link text-white" to="/usercart">Cart <span className="badge bg-light text-dark ms-1 me-1">{count}</span></Link>
                    </button>
                 </div>

                <Switch>
                    <Route path="/viewproduct">
                        <ViewProduct addProductToCart={addProductToCart}/>
                    </Route>
                    <Route path="/usercart">
                        <UserCart cartObj={cartObj} />
                    </Route>
                    <Route path="/productdetails">
                        <ProductDetails/>
                    </Route>

                    <Route path="/">
                        <Redirect to="/viewproduct"/>
                    </Route>

                    

                </Switch>
            </BrowserRouter>
        </div>
    )
}