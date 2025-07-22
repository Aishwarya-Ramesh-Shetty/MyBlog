const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const authRoutes = require('./routes/auth.js')


const app = express()
app.use(express.json())


app.use('/api/auth',authRoutes);

app.get('/',(req,res) =>{
    res.send("Blog Api running")
})

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT || 5000,()=>{
        console.log("Server is running")
    })
})
.catch(err=>console.error("Mongo error",err))