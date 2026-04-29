import {useEffect,useState} from 'react'
import axios from 'axios'
import '../App.css'

export default function AdminDashboard({setView}){

const API='https://healthcare-domain.onrender.com'

const [doctors,setDoctors]=useState([])

useEffect(()=>{load()},[])

const load=async()=>{
const r=await axios.get(API+'/api/admin/pending-doctors')
setDoctors(r.data)
}

const approve=async(id)=>{
await axios.put(API+'/api/admin/approve/'+id)
load()
}

return(
<div className='dashboard'>

<div className='navbar'>
<h1 className='title'>⚙️ Admin Dashboard</h1>
<button className='logout' onClick={()=>setView('landing')}>
Logout
</button>
</div>

<div className='section'>
<h2>Pending Doctors</h2>

{doctors.map(d=>(
<div className='item' key={d._id}>

<div>
<b>{d.name}</b><br/>
{d.specialization}
</div>

<button className='success' onClick={()=>approve(d._id)}>
Approve
</button>

</div>
))}

{doctors.length===0 && <p>No Pending Doctors</p>}

</div>

</div>
)
}