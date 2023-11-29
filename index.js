const express=require('express')
const app=express()
const dotenv=require('dotenv')
const router1 = require('./routerpage/register')
const cors=require("cors")
// const auth=require("./middleware/authenticationpage")
const bodyParser=require('body-parser')
app.use(cors({
    origin:"*"
}))
dotenv.config()
app.use(bodyParser.json())
app.use(express())
const port=process.env.PORT
const jwt=require("jsonwebtoken")
const auth = require('./middleware/authenticationpage')
app.get("/",auth,(req,res)=>{
    res.send("home page ")
})

app.use(router1)

app.listen(port,()=>{
    try{
        console.log("currently running with",`${port}`)
    }
    catch(error){
        console.log(error)
    }
})