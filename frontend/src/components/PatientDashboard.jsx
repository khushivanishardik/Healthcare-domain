import {useEffect,useState}
from 'react'

import axios
from 'axios'

import '../App.css'



export default function PatientDashboard({
setView,
currentUserEmail
}){

const API=
'https://healthcare-domain.onrender.com'

const userEmail=
currentUserEmail

const [editing,setEditing]=
useState(false)

const [profile,setProfile]=
useState({
name:'',
age:'',
gender:'',
phone:''
})

const [appointments,
setAppointments]=
useState([])

const [doctors,
setDoctors]=
useState([])

const [doctorId,setDoctorId]=
useState('')

const [doctorName,setDoctorName]=
useState('')

const [specialization,
setSpecialization]=
useState('')

const [appointmentDate,
setAppointmentDate]=
useState('')

const [appointmentTime,
setAppointmentTime]=
useState('')



const fetchProfile=
async()=>{

const r=
await axios.get(
API+
'/api/profile/one/'
+
userEmail
)

if(r.data){
setProfile(r.data)
}

}



const fetchAppointments=
async()=>{

const r=
await axios.get(
API+
'/api/appointments/all'
)

setAppointments(

r.data.filter(
a=>a.patientId===userEmail
)

)

}



const fetchDoctors=
async()=>{

const r=
await axios.get(
API+
'/api/admin/approved-doctors'
)

setDoctors(
r.data
)

}



useEffect(()=>{

fetchProfile()

fetchAppointments()

fetchDoctors()

},[])



const saveProfile=
async()=>{

await axios.post(

API+
'/api/profile/save',

{
userEmail,
...profile
}

)

setEditing(false)

}



const book=
async()=>{

await axios.post(

API+
'/api/appointments/book',

{
patientId:userEmail,
patientName:profile.name,
doctorId,
doctorName,
specialization,
appointmentDate,
appointmentTime
}

)

fetchAppointments()

}



return(

<div className='page'>

<div className='card'>

<div className='nav-top'>

<h1>
Patient Dashboard
</h1>

<button
onClick={()=>setView(
'landing'
)}
>
Logout
</button>

</div>



<div className='card'>

<h2>
Personal Details
</h2>

{
!editing
?

<div>

<p>Name: {profile.name}</p>

<p>Age: {profile.age}</p>

<p>Gender: {profile.gender}</p>

<p>Phone: {profile.phone}</p>

<button
onClick={()=>setEditing(true)}
>
Edit Profile
</button>

</div>

:

<div className='row'>

<div>

<label>Name</label>

<input
value={profile.name||''}
onChange={(e)=>
setProfile({
...profile,
name:e.target.value
})
}
/>

<label>Age</label>

<input
value={profile.age||''}
onChange={(e)=>
setProfile({
...profile,
age:e.target.value
})
}
/>

</div>


<div>

<label>Gender</label>

<input
value={profile.gender||''}
onChange={(e)=>
setProfile({
...profile,
gender:e.target.value
})
}
/>

<label>Phone</label>

<input
value={profile.phone||''}
onChange={(e)=>
setProfile({
...profile,
phone:e.target.value
})
}
/>

</div>


<button onClick={saveProfile}>
Save
</button>

</div>

}

</div>



<div className='card'>

<h2>
Book Appointment
</h2>


<select
onChange={(e)=>{

const d=
doctors.find(
x=>x._id===e.target.value
)

if(d){

setDoctorId(d._id)

setDoctorName(d.name)

setSpecialization(
d.specialization
)

}

}}
>

<option value=''>
Select Approved Doctor
</option>

{doctors.map((d)=>(

<option
key={d._id}
value={d._id}
>

{d.name}

-

{d.specialization}

</option>

))}

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
Book Appointment
</button>

</div>



<div className='card'>

<h2>
Appointment History
</h2>

{appointments.map((a)=>(

<div
className='appointment-item'
key={a._id}
>

{a.doctorName}

|

{a.appointmentDate}

|

{a.appointmentTime}

<span className='badge'>

{a.status}

</span>

</div>

))}

</div>

</div>

</div>

)

}