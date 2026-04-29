import {useEffect,useState} from 'react'
import axios from 'axios'
import '../App.css'

export default function DoctorDashboard({setView,currentDoctorEmail}){

const API='https://healthcare-domain.onrender.com'

const [doctor,setDoctor]=useState(null)
const [appointments,setAppointments]=useState([])

useEffect(()=>{load()},[])

const load=async()=>{
const d=await axios.get(API+'/api/doctor-auth/profile/'+currentDoctorEmail)
setDoctor(d.data)

const a=await axios.get(API+'/api/appointments/all')
setAppointments(a.data.filter(x=>x.doctorId===d.data._id))
}

const update=async(id,status)=>{
await axios.put(API+'/api/appointments/update/'+id,{status})
load()
}

if(!doctor) return <div className='dashboard'>Loading...</div>

return(
<div className='dashboard'>

<div className='navbar'>
<h1 className='title'>🩺 Doctor Dashboard</h1>
<button className='logout' onClick={()=>setView('landing')}>
Logout
</button>
</div>

<div className='section'>
<h2>Profile</h2>
<p>{doctor.name}</p>
<p>{doctor.specialization}</p>
</div>

<div className='section'>
<h2>Appointments</h2>

{appointments.map(a=>(
<div className='item' key={a._id}>

<div>
<b>{a.patientName}</b><br/>
{a.appointmentDate} | {a.appointmentTime}
</div>

<div className='actions'>

{a.status==='Pending' && (
<>
<button className='success' onClick={()=>update(a._id,'Accepted')}>Accept</button>
<button className='danger' onClick={()=>update(a._id,'Rejected')}>Reject</button>
</>
)}

{a.status==='Accepted' && (
<button className='primary' onClick={()=>update(a._id,'Completed')}>Complete</button>
)}

</div>

</div>
))}

</div>

</div>
)
}