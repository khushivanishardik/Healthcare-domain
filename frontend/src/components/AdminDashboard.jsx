import {useEffect,useState} from 'react'
import axios from 'axios'
import '../App.css'

export default function AdminDashboard({setView}){

const API='https://healthcare-domain.onrender.com'

const [doctors,setDoctors]=useState([])



const fetchPending=async()=>{

const res=
await axios.get(
API+'/api/admin/pending-doctors'
)

setDoctors(res.data)

}



useEffect(()=>{
fetchPending()
},[])



const approveDoctor=async(id)=>{

await axios.put(
API+'/api/admin/approve/'+id
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
className="logout"
onClick={()=>setView('landing')}
>
Logout
</button>

</div>



<div className='card'>

<h2>
Pending Doctor Applications
</h2>



{
doctors.length===0
&&
(
<p>
No Pending Doctors
</p>
)
}



{doctors.map((doc)=>(

<div
className='appointment-item'
key={doc._id}
>

<div>

<p>
<b>{doc.name}</b>
</p>

<p>
{doc.specialization}
</p>

<p>
{doc.email}
</p>

</div>


<div className="actions">

<button
className="success"
onClick={()=>
approveDoctor(doc._id)
}
>
Approve
</button>

</div>

</div>

))}

</div>

</div>

</div>

)

}