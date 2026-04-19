const express=require('express');

const router=
express.Router();

const Notification=
require('../models/Notification');



router.post(
'/add',
async(req,res)=>{

const note=
await Notification.create(
req.body
);

res.json({
message:'Notification added'
});

});



router.get(
'/all',
async(req,res)=>{

const notes=
await Notification.find();

res.json(
notes
);

});


module.exports=
router;