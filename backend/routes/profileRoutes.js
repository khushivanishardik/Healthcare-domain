const express = require('express');
const router = express.Router();

const Profile = require('../models/Profile');

router.post('/save', async (req,res)=>{

 try{

   console.log(req.body);

   const profile = await Profile.create({
     name:req.body.name,
     age:req.body.age,
     bloodGroup:req.body.bloodGroup,
     allergies:req.body.allergies
   });

   res.json({
     message:'Profile saved',
     profile
   });

 }catch(err){

   console.error(err);

   res.status(500).json({
     message:'Server error'
   });

 }

});

router.get('/all', async(req,res)=>{

 try{

   const profiles = await Profile.find();

   res.json(profiles);

 }catch(err){

   console.error(err);

   res.status(500).json({
    message:'Server error'
   });

 }

});

module.exports = router;