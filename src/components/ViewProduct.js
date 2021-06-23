import { useEffect, useState } from "react";
import Items from './Items';
import axios from 'axios'

export default function ViewProduct(){
    let[product,setProduct]=useState([])
    useEffect(()=>{
        axios.get('/product/getproducts')
        .then(res=>{
            let productObj=res.data
            setProduct([...productObj.message])
        })
    },[])

    console.log(product)

    return(
        <div className="row m-2">
            {
                product.map((productObj,ind)=>{
                    return(
                        <div className="col col-md-4 col-lg-4 mt-2 w-25">
                            <Items productObj={productObj} key={ind}/>
                        </div>
                    )
                })
            }
        </div>
    )
}

