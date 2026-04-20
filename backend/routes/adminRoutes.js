const express =
require('express');

const router=
express.Router();

const Admin=
require('../models/Admin');

const Doctor=
require('../models/Doctor');



router.post(
'/login',
async(req,res)=>{

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
'Admin login success'
});

});



router.get(
'/pending-doctors',
async(req,res)=>{

const doctors=
await Doctor.find({

status:'pending'

});

res.json(
doctors
);

});



router.put(
'/approve/:id',
async(req,res)=>{

await Doctor.findByIdAndUpdate(

req.params.id,

{
status:'approved'
}

);

res.json({
message:
'Doctor approved'
});

});



router.get(
'/approved-doctors',
async(req,res)=>{

const doctors=
await Doctor.find({

status:'approved'

});

res.json(
doctors
);

});



module.exports=router;