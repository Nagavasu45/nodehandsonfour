const jwt=require('jsonwebtoken')
// const dotenv=require('dotenv')
// dotenv.config();
const secretkey='Nagava'
const auth=(req,res,next)=>{
const BToken=req.headers['authorization'];
if(BToken){
    const token=BToken.split(" ")[1];
    const validuser=jwt.verify(token,secretkey)
if(validuser){
    next();
}
else{
    res.send({msg:"Not Authorized"})
}
}
else{
    res.send({msg:"Not Authorized"})
}
}
module.exports=auth