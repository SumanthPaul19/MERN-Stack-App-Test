import axios from 'axios'
import { useEffect, useState } from 'react'


export default function ProductDetails(){

    let [productObj,setProductObj]=useState('')
    //to fetch card data
    useEffect(()=>{
        let productname=localStorage.getItem("productname")
        axios.get(`/product/getproduct/${productname}`)
        .then(res=>{  
            setProductObj(res.data.message)
            console.log(res.data.message)
        })
        .catch(err=>console.log(err.message))
    },[])
   
    
    return(
        <div className="container mt-5">
            
            
                        <div>
                            <h1>{productObj.productname}</h1>
                            <h1>{productObj.brand}</h1>
                            <h1>{productObj.price}</h1>
                            <img src={productObj.productImage} width="300" alt=""/>
                        </div>

                        <div className="card mt-5 shadow mb-5">
                            <div className="row">
                                <div className="col-md-3">
                                    <img src={productObj.productImage} width="300" height="300" alt=""/>
                                </div>
                                    <div className="col-md-9">
                                        <div className="card-body">
                                            <h6 className="">{productObj.productname}</h6> 
                                            <h1 >{productObj.brand}</h1>
                                            <h1 >{productObj.price}</h1> 
                                             <p>qwertyuiop</p>
                                            <button className="btn ">Add to Cart</button>
                                        </div>
                                     </div>
                                </div>
                            </div>
        </div>
    )
}