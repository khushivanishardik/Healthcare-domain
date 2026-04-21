import '../App.css'

export default function Landing({setView}){

return(

<div className='page'>

<div className='card hero'>

<h1  align='center'>
Healthcare Management Portal
</h1>

<p>
Patients, Doctors and Admin
in one secure workflow.
</p>


<div className='role-grid'>

<button align='center'
className='primary'
onClick={()=>setView(
'patientRegister'
)}
>
Patient Portal
</button>


<button align='center'
className='secondary'
onClick={()=>setView(
'doctorRegister'
)}
>
Doctor Portal
</button>


<button align='center'
className='ghost'
onClick={()=>setView(
'adminDashboard'
)}
>
Admin Portal
</button>

</div>

</div>

</div>

)

}