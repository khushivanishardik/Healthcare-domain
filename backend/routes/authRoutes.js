const express = require('express');

const router = express.Router();

const User = require('../models/User');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');



router.post(
'/register',
async(req,res)=>{

try{

const {
username,
email,
password
}=req.body;



if(
!username ||
!email ||
!password
){

return res.status(400).json({
message:'All fields required'
});

}



const existing=
await User.findOne({
email
});


if(existing){

return res.status(400).json({
message:'User already exists'
});

}



const hashedPassword=
await bcrypt.hash(
password,
10
);



await User.create({

username,

email,

password:hashedPassword

});



res.json({
message:
'Patient registered successfully'
});


}catch(err){

console.log(err);

res.status(500).json({
message:'Server error'
});

}

});



router.post(
'/login',
async(req,res)=>{

try{

const {
email,
password
}=req.body;


const user=
await User.findOne({
email
});


if(!user){

return res.status(400).json({
message:'Invalid credentials'
});

}


const isMatch=
await bcrypt.compare(
password,
user.password
);


if(!isMatch){

return res.status(400).json({
message:'Invalid credentials'
});

}



const token=
jwt.sign(

{
id:user._id,
role:'patient'
},

process.env.JWT_SECRET
|| 'mysecretkey',

{
expiresIn:'1d'
}

);



res.json({

message:
'Login successful',

token,

username:
user.username

});


}catch(err){

console.log(err);

res.status(500).json({
message:'Server error'
});

}

});



module.exports = router;