const express = require('express');

const router = express.Router();

const Appointment =
require('../models/Appointment');


router.post('/book', async(req,res)=>{

 try{

   const appointment =
   await Appointment.create(
    req.body
   );

   res.json({
    message:'Appointment booked',
    appointment
   });

 }catch(err){

   res.status(500).json({
    message:'Server error'
   });

 }

});



router.get(
'/all',
async(req,res)=>{

try{

const appointments =
await Appointment.find();

res.json(
appointments
);

}catch(err){

res.status(500).json({
message:'Server error'
});

}

});



router.put(
'/update/:id',
async(req,res)=>{

try{

const appointment =
await Appointment.findById(
req.params.id
);

if(!appointment){

return res.status(404).json({
message:'Appointment not found'
});

}



if(
req.body.status==='Accepted'
){

appointment.status =
'Accepted';

}



if(
req.body.status==='Rejected'
){

appointment.status =
'Rejected';

}



if(
req.body.status==='Completed'
){

appointment.status =
'Completed';

appointment.completedAt =
new Date();

}



await appointment.save();

res.json({
message:'Appointment updated',
appointment
});

}catch(err){

res.status(500).json({
message:'Server error'
});

}

});



module.exports = router;