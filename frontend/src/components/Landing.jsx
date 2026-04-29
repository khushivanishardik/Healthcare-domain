import '../App.css'

export default function Landing({setView}){

return(

<div className='page'>

<div className='card'>

<h1 align='center'>🏥 Healthcare Management Portal</h1>

<p className='subtitle'>
Patients, Doctors and Admin — secure and modern system
</p>

<div className='role-container'>

<div className='role-card'>

<h3>👤 Patient</h3>

<div className='role-actions'>
<button
className='primary'
onClick={()=>setView('patientLogin')}
>
Login
</button>

<button
className='outline'
onClick={()=>setView('patientRegister')}
>
Register
</button>
</div>

</div>


<div className='role-card'>

<h3>🩺 Doctor</h3>

<div className='role-actions'>
<button
className='primary'
onClick={()=>setView('doctorLogin')}
>
Login
</button>

<button
className='outline'
onClick={()=>setView('doctorRegister')}
>
Apply
</button>
</div>

</div>


<div className='role-card'>

<h3>⚙️ Admin</h3>

<div className='role-actions'>
<button
className='primary'
onClick={()=>setView('adminDashboard')}
>
Open
</button>
</div>

</div>

</div>

</div>

</div>

)

}