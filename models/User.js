const mongoose = require('mongoose')
const bcrypt = require('bcrypt')



const UserSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true,
        trim : true
    },
    email:{
        type : String,
        required : true,
        unique : true,
        lowercase : true
    },
    password:{
        type : String,
        required : true
    },
    bio : String
},{timestamps:true})


UserSchema.pre('save',async function (next){
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password,10);
    next();
})

UserSchema.methods.comparePassword = function (enteredPassword){
    return bcrypt.compare(enteredPassword,this.password)
}

module.exports = mongoose.model('User',UserSchema)