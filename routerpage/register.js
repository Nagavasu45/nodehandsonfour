const router1=require('express').Router()
const arr=[]
const jwt=require("jsonwebtoken")
const saltround=10;
const bcrypt=require('bcrypt')
const dotenv=require("dotenv")
const bodyParser=require("body-parser")
router1.use(bodyParser.json())


dotenv.config();

router1.post('/registerpage',(req,res)=>{
    const user=req.body;
    
    const samemail=arr.find(item=>{
         if(item.Gmail===user.Gmail){
            return 1
         }
    })
    console.log(samemail)
    if(samemail){
        console.log({msg:"email already exists"})
        return res.send({msg:"email already exists"})
    }
    else{
        user.Password=bcrypt.hashSync(user.Password,saltround)
        const token=jwt.sign({user:user.Password},process.env.secretkey,{expiresIn:600000})
        console.log(token)
        arr.push(user)
        return res.send({msg:"user successfully registered",jwttoken:token})
    }

})
router1.post('/login',(req,res)=>{
    const logindata=req.body;
    console.log(logindata)
    const findaccount=arr.find((item)=>{
        if(item.Gmail===logindata.Gmail ){
            return item
        }          
       })
       if(!findaccount){
        return res.send({msg:"your not registred user"})
       }
       const validuser=bcrypt.compareSync(logindata.Password,findaccount.Password)
       if(validuser){
        return res.send({msg:"your login successfully"})
       }
       return res.send({msg:"wrong password"})
    
})
module.exports=router1
