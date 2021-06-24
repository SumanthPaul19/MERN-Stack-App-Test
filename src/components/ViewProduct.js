import { useEffect, useState } from "react";
import axios from 'axios'
import { useHistory } from "react-router";

export default function ViewProduct(){

    let history=useHistory();


    let[product,setProduct]=useState([])
    useEffect(()=>{
        axios.get('/product/getproducts')
        .then(res=>{
            let productObj=res.data
            setProduct([...productObj.message])
        })
    },[])

    const addProductToCart=(productObj)=>{
        let username=localStorage.getItem("username")

        let newObj={username,productObj}
        console.log(newObj)

        axios.post("/user/addtocart",newObj)
        .then(res=>{
            let responseObj=res.data
            alert(responseObj.message)

            history.push("/UserCart")
        })
        .catch(err=>{
            console.log("Error in adding to cart",err)
            alert("Something went wrong")
        })
    }

    console.log(product)

    return(
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
            {product &&
                product.map((productObj,index)=>{
                    return(
                        <div class="col" key={index}>
                            <div class="card w-50 mx-auto">
                                <img src={productObj.productImage} class="card-img-top" alt="..." />
                                <div class="card-body">
                                    <h5 class="card-title">{productObj.productname}</h5>
                                    <h5 className="">{productObj.price}</h5>
                                    <p class="card-text">{productObj.productdescription}</p>

                                    <button className="btn btn-primary float-end" onClick={()=>addProductToCart(productObj)}>Add to cart</button> 

                                </div>
                            </div>
                        </div>
                    )
                })

            }
        </div>
    )
}

