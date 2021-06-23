//create express app
const exp=require('express')
const adminApi=exp.Router();//create mini express application
adminApi.use(exp.json())
const jwt=require('jsonwebtoken');
const expressErrorHandler = require('express-async-handler');
 
 
adminApi.post("/login",expressErrorHandler( async(req,res,next)=>{
    
    let adminCollectionObj=req.app.get("adminCollectionObj")
    
    let credentials=req.body;

    //check for username
    let user=await adminCollectionObj.findOne({username:credentials.username})
    //if user not found
    if(user===null)
    {
        res.send({message:"Invalid username"})
    }
    else if(user.password!==credentials.password){
        res.send({message:"Invalid Password"})
    }
    else{
        //create and send token
        let token= await jwt.sign({username:credentials.username},'abcdef',{expiresIn: 120 })
         //send token to client
         res.send({message:"Login success",token:token,username:credentials.username})
    }

}))


//export 
module.exports=adminApi