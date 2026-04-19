import {useState,useEffect} from 'react'
import axios from 'axios'

export default function PatientDashboard({setView}){

const [patientName,setPatientName]=useState('')
const [doctorName,setDoctorName]=useState('')
const [appointments,setAppointments]=useState([])

const load=async()=>{

const r=await axios.get(
'https://healthcare-domain.onrender.com/api/appointments/all'
)

setAppointments(
r.data
)

}

useEffect(()=>{

load()

},[])

const book=async()=>{

await axios.post(
'https://healthcare-domain.onrender.com/api/appointments/book',
{
patientName,
doctorName,
appointmentDate:'Tomorrow'
}
)

load()

}

return(

<div className='page'>

<div className='card'>

<h1 className='hero'>
Patient Dashboard
</h1>

<div className='grid'>

<div className='stat'>
Appointments:
{appointments.length}
</div>

<div className='stat'>
Status Tracking Active
</div>

</div>

<h2 className='sectionTitle'>
Book Appointment
</h2>

<input
placeholder='Patient Name'
value={patientName}
onChange={(e)=>setPatientName(e.target.value)}
/>

<input
placeholder='Doctor Name'
value={doctorName}
onChange={(e)=>setDoctorName(e.target.value)}
/>

<button onClick={book}>
Book Appointment
</button>

<h2 className='sectionTitle'>
Appointment History
</h2>

{appointments.map((a)=>(

<div
className='item'
key={a._id}
>

{a.patientName}

|

{a.doctorName}

|

{a.appointmentDate}

|

{a.status}

</div>

))}

<button
onClick={()=>setView('landing')}
>
Logout
</button>

</div>

</div>

)

}