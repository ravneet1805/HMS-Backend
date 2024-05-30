const express = require("express");
require('dotenv').config();
const app = express();
const mongoose = require("mongoose");
const authRouter = require("./routes/authRouter")
const adminRouter = require("./routes/adminRouter")

app.use(express.json())


app.use((req, res, next)=>{
    console.log("HTTP method:"+req.method+"URL:"+req.url);

    next();
})




app.use("/auth", authRouter)
app.use("/admin", adminRouter)


app.get("/", (req,res)=>{
    res.status(200).send("Welcome to HMS")
})

mongoose.connect("mongodb+srv://ravneetsinghrony:D0QGyhmKFh1Fxz7b@cluster0.tzdtifs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("connected to DB");
})
.catch((error)=>{
    console.log(error)
})

const server = app.listen(4000, ()=>{
    console.log("server started")
})