const mongoose = require('mongoose');

const doctorSchema =
new mongoose.Schema({

name:{
type:String,
required:true
},

email:{
type:String,
required:true,
unique:true
},

password:{
type:String,
required:true
},

specialization:{
type:String,
required:true
},

status:{
type:String,
default:'pending'
}

});

module.exports =
mongoose.model(
'Doctor',
doctorSchema
);