const express = require('express');
const router = express.Router();

const Doctor = require('../models/Doctor');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



router.post('/register', async(req,res)=>{

try{

const {
name,
email,
password,
specialization
} = req.body;


const existing =
await Doctor.findOne({
email
});

if(existing){

return res.status(400).json({
message:'Doctor already exists'
});

}


const hashedPassword =
await bcrypt.hash(
password,
10
);


await Doctor.create({

name,
email,
password:hashedPassword,
specialization

});


res.json({
message:'Doctor registered successfully'
});

}catch(err){

res.status(500).json({
message:'Server error'
});

}

});



router.post('/login', async(req,res)=>{

try{

const {
email,
password
}=req.body;


const doctor =
await Doctor.findOne({
email
});


if(!doctor){

return res.status(400).json({
message:'Invalid credentials'
});

}


const isMatch=
await bcrypt.compare(
password,
doctor.password
);


if(!isMatch){

return res.status(400).json({
message:'Invalid credentials'
});

}


const token=jwt.sign(

{
id:doctor._id,
role:'doctor'
},

process.env.JWT_SECRET
|| 'mysecretkey',

{
expiresIn:'1d'
}

);


res.json({

message:
'Doctor login successful',

token

});

}catch(err){

res.status(500).json({
message:'Server error'
});

}

});


module.exports = router;