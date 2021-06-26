import { useEffect, useState } from "react";
import { useParams} from 'react-router-dom'
import axios from 'axios'
//import { useHistory } from "react-router";

export default function ViewProduct(props){

    let addProductToCart=props.addProductToCart

    let[userObj,setUserObj]=useState({});
    let url=useParams();
    let username=url.username;

    //let history=useHistory();
    


    let[product,setProduct]=useState([])
    useEffect(()=>{
        axios.get('/product/getproducts')
        .then(res=>{
            let productObj=res.data
            setProduct([...productObj.message])
        })
        setUserObj({...userObj})
    },[username])





    //this for button conditional rendering forn user and admin (if the card is in admin it should show the button as edit/delete)
    let usertype=localStorage.getItem("username")


    //console.log(product)

    return(
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
            {product &&
                product.map((productObj,index)=>{
                    return(
                        <div class="col" key={index}>
                            <div class="card w-75 mx-auto mt-5">
                                <img src={productObj.productImage} class="card-img-top" alt="..." />
                                <div class="card-body">
                                    <h5 class="card-title text-start">Name : {productObj.productname}</h5>
                                    <h5 class="text-start">Price : {productObj.price}</h5>
                                    <h5 class="text-start">Brand : {productObj.brand}</h5>
                                    <h5 class="text-start">Description : {productObj.productdescription}</h5>

                                    {usertype !="admin" && 
                                        <div class="d-flex float-end">
                                            <button className="btn btn-primary float-end" onClick={()=>addProductToCart(productObj)}>Add to cart</button>  
                                        </div>
                                        ||
                                        <div class="d-flex float-end">
                                            <button className="btn btn-warning float-end">Edit/Delete</button>  
                                        </div>

                                    }


                                </div>
                            </div>
                        </div>
                    )
                })

            }
        </div>
    )
}

