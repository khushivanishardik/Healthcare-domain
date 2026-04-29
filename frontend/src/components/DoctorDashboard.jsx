import {useEffect,useState} from 'react'
import axios from 'axios'
import '../App.css'

export default function DoctorDashboard({setView,currentDoctorEmail}){

const API='https://healthcare-domain.onrender.com'

const [doctor,setDoctor]=useState(null)
const [appointments,setAppointments]=useState([])

const fetchDoctor=async()=>{
const r=await axios.get(API+'/api/doctor-auth/profile/'+currentDoctorEmail)
setDoctor(r.data)
}

const fetchAppointments=async(id)=>{
const r=await axios.get(API+'/api/appointments/all')
setAppointments(r.data.filter(a=>a.doctorId===id))
}

useEffect(()=>{fetchDoctor()},[])

useEffect(()=>{
if(doctor?._id){
fetchAppointments(doctor._id)
}
},[doctor])

const updateStatus=async(id,status)=>{
await axios.put(API+'/api/appointments/update/'+id,{status})
fetchAppointments(doctor._id)
}

if(!doctor){
return <div className='page'><div className='card'>Loading...</div></div>
}

return(

<div className='page'>

<div className='card'>

<div className='nav-top'>
<h1>Doctor Dashboard</h1>
<button className="logout" onClick={()=>setView('landing')}>
Logout
</button>
</div>

<div className='card'>
<h2>Doctor Profile</h2>
<p><b>Name:</b> {doctor.name}</p>
<p><b>Specialization:</b> {doctor.specialization}</p>
</div>

<div className='card'>
<h2>Appointments</h2>

{appointments.map(item=>(

<div className='appointment-item' key={item._id}>

<div>
<p><b>{item.patientName}</b></p>
<p>{item.appointmentDate} | {item.appointmentTime}</p>
<span className='badge'>{item.status}</span>
</div>

<div className="actions">

{item.status==='Pending' && (
<>
<button className="success"
onClick={()=>updateStatus(item._id,'Accepted')}>
Confirm
</button>

<button className="danger"
onClick={()=>updateStatus(item._id,'Rejected')}>
Decline
</button>
</>
)}

{item.status==='Accepted' && (
<button className="primary"
onClick={()=>updateStatus(item._id,'Completed')}>
Complete
</button>
)}

</div>

</div>

))}

</div>

</div>

</div>

)
}