import {useEffect,useState}
from 'react'

import axios
from 'axios'

import '../App.css'



export default function AdminDashboard({setView}){

const API=
'https://healthcare-domain.onrender.com'

const [doctors,
setDoctors]=
useState([])



const fetchPending=
async()=>{

const r=
await axios.get(

API+
'/api/admin/pending-doctors'

)

setDoctors(
r.data
)

}



useEffect(()=>{
fetchPending()
},[])



const approve=
async(id)=>{

await axios.put(

API+
'/api/admin/approve/'
+
id

)

fetchPending()

}



return(

<div className='page'>

<div className='card'>

<div className='nav-top'>

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

</div>



<div className='card'>

<h2>
Pending Doctor Applications
</h2>

{doctors.map((doc)=>(

<div
className='appointment-item'
key={doc._id}
>

<p>

{doc.name}

|

{doc.specialization}

</p>

<button
onClick={()=>
approve(
doc._id
)
}
>
Approve
</button>

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

</div>

</div>

)

}