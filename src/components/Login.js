import React from 'react'
import {useForm} from 'react-hook-form'
import {useHistory} from 'react-router-dom'
import axios from 'axios';

export default function Login(props){
    let {register,handleSubmit,formState:{errors}}=useForm();

    let history=useHistory();
    //console.log(history)

    const onFormSubmit=(credentials)=>{

        console.log(credentials)

        axios.post(`${credentials.usertype}/login`,credentials)
        .then(res=>{
            let responseObj=res.data;

            //if login sucsess
            if(responseObj.message==='Login success'){
                //save token to browser's local memory
                localStorage.setItem("token",responseObj.token)
                localStorage.setItem("username",responseObj.username)
                localStorage.setItem("user",JSON.stringify(responseObj.userObj))

                //update state
                props.setUserStatus(true)

                if(credentials.usertype==='user'){
                    //redirect to user profile page
                    history.push(`/userprofile/${responseObj.username}`)
                    // history.push(`/viewproduct`)
                }
                if(credentials.usertype==='admin'){
                    //redirect to admin profilepage
                    history.push(`/adminprofile/${responseObj.username}`)
                }
            }
            //if login failed
            else{
                alert(responseObj.message)
            }
        })
 
    }

    return(
        <form className="w-50 mx-auto" onSubmit={handleSubmit(onFormSubmit)}>

            {/* admin/user */}
            <div className="mt-5" {...register('usertype',{required:true})} >
                <div className="form-check form-check-inline">
                    <input type="radio" name="usertype" id="admin" className="form-check-input" value="admin"    />
                    <label htmlFor="admin">Admin</label>
                </div>
                <div className="form-check form-check-inline">
                    <input type="radio" name="usertype" id="user" className="form-check-input" value="user" />
                    <label htmlFor="user">User</label>
                </div>
                {errors.usertype?.type==='required' && <p className="text-danger">*Please select user type</p>}
            </div>

            {/* username */}
            <label htmlFor="un" className="mt-3">Username</label>
            <input type="text" id="un" {...register('username',{required:true,minLength:5})} className="form-control mb-3" />
            {/*username validation */}
            {errors.username?.type=== 'required' && <p className="text-danger">*Username is required</p>}
            {errors.username?.type=== 'minLength' && <p className="text-danger">*Min-Length should be 5</p>}

            {/* password */}
            <label htmlFor="pw">Password</label>
            <input type="password" id="pw" {...register('password',{required:true})} className="form-control mb-3" />
            {/*password validation */}
            {errors.password && <p className="text-danger">*Password is required</p>}

            <button type="submit" className="btn btn-warning">Login</button>
        </form>
    )
}