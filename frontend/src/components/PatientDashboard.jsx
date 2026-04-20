import {useEffect,useState}
from 'react'

import axios
from 'axios'


export default function PatientDashboard({setView}){

const userEmail=
'user3@gmail.com'

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

const [doctorId,
setDoctorId]=
useState('')

const [doctorName,
setDoctorName]=
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

const res=
await axios.get(

'http://localhost:5000/api/profile/one/'
+userEmail

)

if(res.data){

setProfile(
res.data
)

}

}



const fetchAppointments=
async()=>{

const res=
await axios.get(
'http://localhost:5000/api/appointments/all'
)

setAppointments(

res.data.filter(

a=>
a.patientId===
userEmail

)

)

}



const fetchDoctors=
async()=>{

const res=
await axios.get(

'http://localhost:5000/api/admin/approved-doctors'

)

setDoctors(
res.data
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

'http://localhost:5000/api/profile/save',

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

)

fetchAppointments()

}



return(

<div>

<h1>
User Dashboard
</h1>

<button
onClick={()=>setView(
'landing'
)}
>
Logout
</button>



<h2>
My Profile
</h2>



{
!editing
&&
(
<div>

<p>
Name:
{profile.name}
</p>

<p>
Age:
{profile.age}
</p>

<p>
Gender:
{profile.gender}
</p>

<p>
Phone:
{profile.phone}
</p>

<button
onClick={()=>setEditing(
true
)}
>
Edit Profile
</button>

</div>
)
}



{
editing
&&
(
<div>

<input
value={profile.name||''}
onChange={(e)=>
setProfile({
...profile,
name:e.target.value
})
}
/>

<input
value={profile.age||''}
onChange={(e)=>
setProfile({
...profile,
age:e.target.value
})
}
/>

<input
value={profile.gender||''}
onChange={(e)=>
setProfile({
...profile,
gender:e.target.value
})
}
/>

<input
value={profile.phone||''}
onChange={(e)=>
setProfile({
...profile,
phone:e.target.value
})
}
/>

<button onClick={saveProfile}>
Save
</button>

<button
onClick={()=>setEditing(
false
)}
>
Cancel
</button>

</div>
)
}



<h2>
Book Appointment
</h2>

<select
onChange={(e)=>{

const d=
doctors.find(
x=>
x._id===
e.target.value
)

if(d){

setDoctorId(
d._id
)

setDoctorName(
d.name
)

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
Book
</button>



<h2>
Appointment History
</h2>

{appointments.map((a)=>(

<p key={a._id}>

{a.doctorName}

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