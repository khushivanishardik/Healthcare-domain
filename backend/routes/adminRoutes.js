const express = require('express');

const router =
express.Router();

const Admin =
require('../models/Admin');

const Doctor =
require('../models/Doctor');



router.post(
'/login',
async(req,res)=>{

try{

const admin=
await Admin.findOne({

email:req.body.email,

password:req.body.password

});

if(!admin){

return res.status(400).json({
message:'Invalid admin'
});

}

res.json({
message:
'Admin Login Success'
});

}catch(err){

res.status(500).json({
message:'Server error'
});

}

});



router.get(
'/pending-doctors',
async(req,res)=>{

try{

const doctors=
await Doctor.find({
status:'pending'
});

res.json(
doctors
);

}catch(err){

res.status(500).json({
message:'Server error'
});

}

});



router.put(
'/approve/:id',
async(req,res)=>{

try{

await Doctor.findByIdAndUpdate(

req.params.id,

{
status:'approved'
}

);

res.json({
message:
'Doctor Approved'
});

}catch(err){

res.status(500).json({
message:'Server error'
});

}

});


router.get(
'/approved-doctors',
async(req,res)=>{

const doctors=
await Doctor.find({

status:'approved'

})

res.json(
doctors
)

});



module.exports = router;