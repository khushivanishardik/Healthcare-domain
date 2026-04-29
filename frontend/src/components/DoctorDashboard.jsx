import {useEffect,useState} from 'react'
import axios from 'axios'
import '../index.css'

export default function DoctorDashboard({setView,currentDoctorEmail}){

const API='https://healthcare-domain.onrender.com'

const [doctor,setDoctor]=useState(null)
const [appointments,setAppointments]=useState([])

useEffect(()=>{
axios.get(API+'/api/doctor-auth/profile/'+currentDoctorEmail)
.then(r=>setDoctor(r.data))
},[])

useEffect(()=>{
if(doctor){
axios.get(API+'/api/appointments/all')
.then(r=>setAppointments(r.data.filter(a=>a.doctorId===doctor._id)))
}
},[doctor])

const update=async(id,status)=>{
await axios.put(API+'/api/appointments/update/'+id,{status})
window.location.reload()
}

if(!doctor) return <div className="page">Loading...</div>

return(

<div className="page">
<div className="container">

<div className="card">

<h1>Doctor Dashboard</h1>

<button className="btn logout"
onClick={()=>setView('landing')}>
Logout
</button>

</div>

<div className="card">

<h2>{doctor.name}</h2>
<p>{doctor.specialization}</p>

</div>

<div className="card">

<h2>Appointments</h2>

{appointments.map(a=>(
<div className="appointment" key={a._id}>

<div>
{a.patientName} | {a.appointmentDate}
</div>

<div>

{a.status==='Pending' && (
<>
<button className="btn success"
onClick={()=>update(a._id,'Accepted')}>
✔
</button>

<button className="btn danger"
onClick={()=>update(a._id,'Rejected')}>
✖
</button>
</>
)}

{a.status==='Accepted' && (
<button className="btn primary"
onClick={()=>update(a._id,'Completed')}>
Done
</button>
)}

<span className="badge">{a.status}</span>

</div>

</div>
))}

</div>

</div>
</div>

)
}