export default function Landing({setView}){

return(

<div className='page'>

<div className='card'>

<div className='hero'>
HealthCare Pro
</div>

<div className='subtitle'>
Professional portal for patients and doctors
</div>

<div className='grid'>

<div className='stat'>

<h2>Patients</h2>

<button
onClick={()=>setView('patientLogin')}
>
Login
</button>

<button
className='secondary'
onClick={()=>setView('patientRegister')}
>
Register
</button>

</div>

<div className='stat'>

<h2>Doctors</h2>

<button
onClick={()=>setView('doctorLogin')}
>
Login
</button>

<button
className='secondary'
onClick={()=>setView('doctorRegister')}
>
Register
</button>

</div>

</div>

</div>

</div>

)

}