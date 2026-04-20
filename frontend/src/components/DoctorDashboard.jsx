import {useEffect,useState} from 'react'
import axios from 'axios'

export default function DoctorDashboard({setView}){

const API='https://healthcare-domain.onrender.com'

const doctorEmail='doctor4@gmail.com'

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

try{

const res=
await axios.get(
API+'/api/appointments/all'
)

setAppointments(

res.data.filter(
a=>a.doctorId===doctor._id
)

)

}catch(err){
console.log(err)
}

}


useEffect(()=>{
fetchDoctor()
},[])


useEffect(()=>{

if(doctor?._id){
fetchAppointments()
}

},[doctor])


if(!doctor){

return(
<div>
Loading Doctor Dashboard...
</div>
)

}


return(

<div>

<h1>Doctor Dashboard</h1>

<button onClick={()=>setView('landing')}>
Logout
</button>

<h2>Personal Details</h2>

<p>Name: {doctor.name}</p>

<p>Specialization: {doctor.specialization}</p>

<h2>My Appointments</h2>

{appointments.length===0 && (
<p>No Appointments</p>
)}

{appointments.map(item=>(

<div key={item._id}>

<p>
{item.patientName}
|
{item.status}
</p>

</div>

))}

</div>

)

}