import axios from 'axios'
import {useState,useEffect} from'react'


function UserCart(props){

    let cartObj=props.cartObj;




    return(
        <div>{
            cartObj ?
            <table className="table table-bordered text-center w-75 mx-auto mt-5">
                <thead className="bg-dark ">
                    <th className="text-light">ProductName</th>
                    <th  className="text-light">Brand</th>
                    <th  className="text-light">Image</th>
                </thead>
                <tbody>
                    {cartObj &&
                        cartObj.products.map((product,index)=>{
                            return <tr>
                                <td>{product.productname}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <img src={product.productImage} width="60px" alt=""/>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table> : <h1 className="mt-5 text-warning ">Cart is Empty!</h1>
}

        </div>
    )
}

export default UserCart;