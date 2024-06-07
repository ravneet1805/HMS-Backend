const express = require("express");
require('dotenv').config();
const app = express();
const mongoose = require("mongoose");
const authRouter = require("./routes/authRouter")
const adminRouter = require("./routes/adminRouter");
const patientRouter = require("./routes/patientRouter");
const doctorRouter = require("./routes/doctorRouter");
const labRouter = require("./routes/labRouter");

app.use(express.json())


app.use((req, res, next)=>{
    console.log("HTTP method:"+req.method+"URL:"+req.url);

    next();
})




app.use("/auth", authRouter)
app.use("/admin", adminRouter)
app.use("/patient", patientRouter)
app.use("/doctor", doctorRouter)
app.use("/lab", labRouter)


app.get("/", (req,res)=>{
    res.status(200).send("Welcome to HMS")
})

mongoose.connect(process.env.URL)
.then(()=>{
    console.log("connected to DB");
})
.catch((error)=>{
    console.log(error)
})

const server = app.listen(4000, ()=>{
    console.log("server started")
})