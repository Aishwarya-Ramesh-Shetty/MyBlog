const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/User.js')
const router = express.Router()

router.get('/test',(req,res)=>{
    res.send('Auth working')
})

router.post('/register',async(req,res)=>{
    try{
        const {name,email,password,bio} = req.body;
        const existing = await User.findOne({email})
        if (existing) return res.status(400).json({msg:'User already exists'});

        const user = await User.create({name,email,password,bio})
        res.status(201).json({msg:'User registered successfully'})
    }
    catch(err){
        res.status(500).json({msg:'Server error',error:err.message});
    }
})


router.post('/login',async(req,res)=>{
    try{
        const {email,password} = req.body;
        const user =await User.findOne({email})
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({msg:'Invalid Credentials'})
        }

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
            expiresIn : '1d'
        })
        res.json({token,user:{id:user._id,name:user.name,email:user.email}})
    }
    catch(err){
        res.status(500).json({msg:'Server error',error:err.message})
    }
    
})

module.exports = router;