const express=require('express');

const router=
express.Router();

const Appointment=
require('../models/Appointment');



router.post(
'/book',
async(req,res)=>{

const appointment=
await Appointment.create(
req.body
);

res.json({
message:'Appointment booked',
appointment
});

});



router.get(
'/all',
async(req,res)=>{

const appointments=
await Appointment.find();

res.json(
appointments
);

});



router.put(
'/update/:id',
async(req,res)=>{

await Appointment.findByIdAndUpdate(

req.params.id,

{
status:req.body.status
}

);

res.json({
message:'Status updated'
});

});



module.exports=
router;