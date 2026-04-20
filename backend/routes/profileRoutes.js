const express = require('express');

const router = express.Router();

const Profile = require('../models/Profile');



router.post('/save', async(req,res)=>{

 try{

   const profile =
   await Profile.findOneAndUpdate(

    {
      userEmail:req.body.userEmail
    },

    req.body,

    {
      upsert:true,
      new:true
    }

   );

   res.json({
     message:'Profile saved',
     profile
   });

 }catch(err){

   res.status(500).json({
    message:'Server error'
   });

 }

});



router.get('/one/:email', async(req,res)=>{

 try{

   const profile =
   await Profile.findOne({

    userEmail:
    req.params.email

   });

   res.json(profile);

 }catch(err){

   res.status(500).json({
    message:'Server error'
   });

 }

});


module.exports = router;