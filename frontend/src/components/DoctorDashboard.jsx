import {useState,useEffect} from 'react'
import axios from 'axios'

export default function DoctorDashboard({setView}){

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

const update=async(id,status)=>{

await axios.put(
'https://healthcare-domain.onrender.com/api/appointments/update/'+{id},
{
status
}
)

load()

}

return(

<div className='page'>

<div className='card'>

<h1 className='hero'>
Doctor Dashboard
</h1>

<div className='grid'>

<div className='stat'>
Appointments:
{appointments.length}
</div>

<div className='stat'>
Doctor Workflow Active
</div>

</div>

<h2 className='sectionTitle'>
Manage Appointments
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

<br/><br/>

<button
onClick={()=>
update(
a._id,
'Confirmed'
)
}
>
Confirm
</button>

<button
onClick={()=>
update(
a._id,
'Completed'
)
}
>
Complete
</button>

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