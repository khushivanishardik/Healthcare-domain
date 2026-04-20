import {useEffect,useState} from 'react'
import axios from 'axios'

export default function DoctorDashboard({
setView,
currentDoctorEmail
}){

const API='https://healthcare-domain.onrender.com'

const doctorEmail=currentDoctorEmail


const [doctor,setDoctor]=useState(null)

const [appointments,setAppointments]=useState([])



const fetchDoctor=async()=>{

try{

const res=
await axios.get(
API+'/api/doctor-auth/profile/'+doctorEmail
)

if(res.data){
setDoctor(res.data)
}

}catch(err){
console.log(err)
}

}



const fetchAppointments=async()=>{

if(!doctor?._id){
return
}

const res=
await axios.get(
API+'/api/appointments/all'
)

setAppointments(

res.data.filter(
a=>a.doctorId===doctor._id
)

)

}



useEffect(()=>{
fetchDoctor()
},[])



useEffect(()=>{

if(doctor?._id){
fetchAppointments()
}

},[doctor])



const updateStatus=
async(id,status)=>{

await axios.put(

API+
'/api/appointments/update/'
+
id,

{
status
}

)

fetchAppointments()

}



if(!doctor){

return(
<div>
Loading Doctor Dashboard...
</div>
)

}



return(

<div>

<h1>
Doctor Dashboard
</h1>

<button
onClick={()=>setView('landing')}
>
Logout
</button>


<hr/>


<h2>
Personal Details
</h2>

<p>
Name:
{doctor.name}
</p>

<p>
Specialization:
{doctor.specialization}
</p>


<hr/>


<h2>
My Appointments
</h2>


{appointments.length===0 && (
<p>No Appointments</p>
)}



{appointments.map((item)=>(

<div key={item._id}>

<p>

Patient:
{item.patientName}

|

Date:
{item.appointmentDate}

|

Time:
{item.appointmentTime}

|

Status:
{item.status}

</p>



{
item.status==='Pending'
&&
(
<>

<button
onClick={()=>
updateStatus(
item._id,
'Accepted'
)
}
>
Confirm
</button>



<button
onClick={()=>
updateStatus(
item._id,
'Rejected'
)
}
>
Decline
</button>

</>
)
}



{
item.status==='Accepted'
&&
(
<button
onClick={()=>
updateStatus(
item._id,
'Completed'
)
}
>
Complete
</button>
)
}



{
item.status==='Completed'
&&
(
<div>

Completed ✔

<br/>

{
new Date(
item.completedAt
).toLocaleString()
}

</div>
)
}



{
item.status==='Rejected'
&&
(
<div>
Declined
</div>
)
}


<hr/>

</div>

))}

</div>

)

}