import {useEffect,useState} from 'react'
import axios from 'axios'
import '../index.css'

export default function AdminDashboard({setView}){

const API='https://healthcare-domain.onrender.com'

const [docs,setDocs]=useState([])

useEffect(()=>{
axios.get(API+'/api/admin/pending-doctors')
.then(r=>setDocs(r.data))
},[])

const approve=async(id)=>{
await axios.put(API+'/api/admin/approve/'+id)
window.location.reload()
}

return(

<div className="page">
<div className="container">

<div className="card">

<h1>Admin Dashboard</h1>

<button className="btn logout"
onClick={()=>setView('landing')}>
Logout
</button>

</div>

<div className="card">

<h2>Pending Doctors</h2>

{docs.length===0 && <p>No pending</p>}

{docs.map(d=>(
<div className="appointment" key={d._id}>

<div>
{d.name} | {d.specialization}
</div>

<button className="btn success"
onClick={()=>approve(d._id)}>
Approve
</button>

</div>
))}

</div>

</div>
</div>

)
}