import '../index.css'

export default function Landing({setView}){

return(

<div className="page">
<div className="container">

<div className="card">

<h1 align="center">🏥 Healthcare Portal</h1>
<p align="center" className="subtitle">
Smart system for Patients, Doctors and Admin
</p>

<div className="row">

<button className="btn primary"
onClick={()=>setView('patientLogin')}>
👤 Patient
</button>

<button className="btn success"
onClick={()=>setView('doctorLogin')}>
🩺 Doctor
</button>

<button className="btn danger"
onClick={()=>setView('adminDashboard')}>
⚙️ Admin
</button>

</div>

</div>

</div>
</div>

)
}