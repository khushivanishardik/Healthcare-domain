import {useEffect,useState} from 'react';
import axios from 'axios';

export default function PatientDashboard({setView}){

const userEmail='user3@gmail.com';

const [profile,setProfile]=useState({
name:'',
age:'',
gender:'',
bloodGroup:'',
phone:'',
address:'',
allergies:''
});

const [appointments,setAppointments]=useState([]);

const [doctorId,setDoctorId]=useState('doc1');
const [doctorName,setDoctorName]=useState('Dr Sharma');
const [specialization,setSpecialization]=useState('Cardiology');

const [appointmentDate,setAppointmentDate]=useState('');
const [appointmentTime,setAppointmentTime]=useState('');



const fetchAppointments=async()=>{

const res=
await axios.get(
'http://localhost:5000/api/appointments/all'
);

setAppointments(

res.data.filter(
a=>a.patientId===userEmail
)

);

};



const fetchProfile=async()=>{

try{

const res=
await axios.get(
'http://localhost:5000/api/profile/one/'+userEmail
);

if(res.data){

setProfile(res.data);

}

}catch(err){}

};



useEffect(()=>{

fetchProfile();

fetchAppointments();

},[]);



const saveProfile=async()=>{

await axios.post(
'http://localhost:5000/api/profile/save',
{
userEmail,
...profile
}
);

alert(
'Profile saved'
);

};



const book=async()=>{

await axios.post(
'http://localhost:5000/api/appointments/book',
{

patientId:userEmail,

patientName:
profile.name,

doctorId,

doctorName,

specialization,

appointmentDate,

appointmentTime

}
);

fetchAppointments();

};



return(

<div>

<h1>User Dashboard</h1>

<button
onClick={()=>setView('landing')}
>
Logout
</button>



<h2>My Profile</h2>

<input
placeholder='Name'
value={profile.name}
onChange={(e)=>
setProfile({
...profile,
name:e.target.value
})
}
/>

<input
placeholder='Age'
value={profile.age}
onChange={(e)=>
setProfile({
...profile,
age:e.target.value
})
}
/>

<input
placeholder='Gender'
value={profile.gender}
onChange={(e)=>
setProfile({
...profile,
gender:e.target.value
})
}
/>

<input
placeholder='Blood Group'
value={profile.bloodGroup}
onChange={(e)=>
setProfile({
...profile,
bloodGroup:e.target.value
})
}
/>

<input
placeholder='Phone'
value={profile.phone}
onChange={(e)=>
setProfile({
...profile,
phone:e.target.value
})
}
/>

<input
placeholder='Address'
value={profile.address}
onChange={(e)=>
setProfile({
...profile,
address:e.target.value
})
}
/>

<input
placeholder='Allergies'
value={profile.allergies}
onChange={(e)=>
setProfile({
...profile,
allergies:e.target.value
})
}
/>

<button onClick={saveProfile}>
Save Profile
</button>



<h2>Book Appointment</h2>

<select
onChange={(e)=>{

if(e.target.value==='doc1'){

setDoctorId('doc1');
setDoctorName('Dr Sharma');
setSpecialization('Cardiology');

}

if(e.target.value==='doc2'){

setDoctorId('doc2');
setDoctorName('Dr Mehta');
setSpecialization('Dermatology');

}

}}
>

<option value='doc1'>
Dr Sharma - Cardiology
</option>

<option value='doc2'>
Dr Mehta - Dermatology
</option>

</select>


<input
type='date'
value={appointmentDate}
onChange={(e)=>
setAppointmentDate(
e.target.value
)}
/>


<input
type='time'
value={appointmentTime}
onChange={(e)=>
setAppointmentTime(
e.target.value
)}
/>

<button onClick={book}>
Book
</button>



<h2>Appointment History</h2>

{appointments.map((a)=>(

<p key={a._id}>

{a.doctorName}

|

{a.specialization}

|

{a.appointmentDate}

|

{a.appointmentTime}

|

{a.status}

</p>

))}

</div>

)

}