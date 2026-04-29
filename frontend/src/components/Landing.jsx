import '../App.css'

export default function Landing({setView}){

return(

<div className='page'>

<div className='card'>

<h1>
🏥 Healthcare Management Portal
</h1>

<p className='subtitle'>
A smart system for Patients, Doctors and Admin — fast, secure and modern.
</p>

<div className='role-buttons'>

<button
className='role-btn patient'
onClick={()=>setView('patientLogin')}
>
👤 Patient Portal
</button>

<button
className='role-btn doctor'
onClick={()=>setView('doctorLogin')}
>
🩺 Doctor Portal
</button>

<button
className='role-btn admin'
onClick={()=>setView('adminDashboard')}
>
⚙️ Admin Portal
</button>

</div>

</div>

</div>

)

}