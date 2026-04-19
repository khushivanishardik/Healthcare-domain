const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

const appointmentRoutes =
require('./routes/appointmentRoutes');

app.use(
 '/api/appointments',
 appointmentRoutes
);

const profileRoutes=
require('./routes/profileRoutes');

app.use(
'/api/profile',
profileRoutes
);

const notificationRoutes=
require('./routes/notificationRoutes');

app.use(
'/api/notifications',
notificationRoutes
);

const doctorAuthRoutes =
require('./routes/doctorAuthRoutes');

app.use(
'/api/doctor-auth',
doctorAuthRoutes
);

app.get('/', (req,res)=>{
   res.send('API Running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
   console.log(`Server running on port ${PORT}`);
});