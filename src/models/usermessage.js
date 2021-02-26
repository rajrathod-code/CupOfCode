const mongoose = require('mongoose');
const validator = require('validator');

const usermessageSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email Id");
            }
        }
    },
    phone:{
        type:Number,
        required:true,
        unique:true,
        min:10
    },
    message:{
        type:String,
        required:true,
        minLength:3
    }

})

//Creating Collection:

const User = mongoose.model("Usermessage",usermessageSchema);

//Exporting User to App for more operations

module.exports = User; 