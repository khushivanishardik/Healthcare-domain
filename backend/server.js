const express = require('express');

const mongoose = require('mongoose');

const cors = require('cors');

require('dotenv').config();



const authRoutes =
require('./routes/authRoutes');

const doctorAuthRoutes =
require('./routes/doctorAuthRoutes');

const adminRoutes =
require('./routes/adminRoutes');

const profileRoutes =
require('./routes/profileRoutes');

const appointmentRoutes =
require('./routes/appointmentRoutes');



const app = express();



app.use(cors());

app.use(express.json());



mongoose.connect(
process.env.MONGO_URI
)
.then(()=>{

console.log(
'MongoDB Connected'
);

})
.catch((err)=>{

console.log(err);

});



app.use(
'/api/auth',
authRoutes
);


app.use(
'/api/doctor-auth',
doctorAuthRoutes
);


app.use(
'/api/admin',
adminRoutes
);


app.use(
'/api/profile',
profileRoutes
);


app.use(
'/api/appointments',
appointmentRoutes
);



app.listen(
5000,
()=>{

console.log(
'Server running on port 5000'
);

}
);