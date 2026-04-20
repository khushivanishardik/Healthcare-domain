import {useEffect,useState}
from 'react'

import axios from 'axios'



export default function AdminDashboard({setView}){

const [doctors,
setDoctors]=
useState([])



const fetchPendingDoctors=
async()=>{

const res=
await axios.get(

'http://localhost:5000/api/admin/pending-doctors'

)

setDoctors(
res.data
)

}



useEffect(()=>{

fetchPendingDoctors()

},[])



const approveDoctor=
async(id)=>{

await axios.put(

'http://localhost:5000/api/admin/approve/'+id

)

fetchPendingDoctors()

}



return(

<div>

<h1>
Admin Dashboard
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
Pending Doctor Applications
</h2>



{doctors.map((doc)=>(

<div key={doc._id}>

<p>

Name:
{doc.name}

|

Email:
{doc.email}

|

Specialization:
{doc.specialization}

|

Status:
{doc.status}

</p>


<button

onClick={()=>
approveDoctor(
doc._id
)
}

>
Approve
</button>


<hr/>

</div>

))}



{
doctors.length===0
&&
(
<p>
No Pending Doctors
</p>
)
}

</div>

)

}