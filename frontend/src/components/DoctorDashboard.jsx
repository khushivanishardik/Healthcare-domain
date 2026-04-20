import {useEffect,useState} from 'react';

import axios from 'axios';



export default function DoctorDashboard({setView}){

const doctorName='Dr Sharma';


const [appointments,
setAppointments]=
useState([])



const fetchAppointments=
async()=>{

const res=
await axios.get(
'http://localhost:5000/api/appointments/all'
)


setAppointments(

res.data.filter(

a=>
a.doctorName===
doctorName

)

)

}



useEffect(()=>{

fetchAppointments()

},[])



const updateStatus=
async(id,status)=>{

await axios.put(

'http://localhost:5000/api/appointments/update/'+id,

{
status
}

)

fetchAppointments()

}



return(

<div>

<h1>
Doctor Dashboard
</h1>

<button
onClick={()=>setView(
'landing'
)}
>
Logout
</button>

<hr/>


<h2>
My Appointments
</h2>



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
item.status==="Pending"
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
Accept
</button>



<button

onClick={()=>
updateStatus(
item._id,
'Rejected'
)
}

>
Reject
</button>

</>

)
}



{
item.status==="Accepted"
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
item.status==="Completed"
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
item.status==="Rejected"
&&
(

<div>

Rejected

</div>

)
}


<hr/>

</div>

))}

</div>

)

}