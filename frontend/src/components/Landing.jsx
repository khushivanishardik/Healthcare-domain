export default function Landing({setView}){

return(

<div>

<h1>
Healthcare System
</h1>

<button
onClick={()=>setView(
'patientRegister'
)}
>
Patient
</button>


<button
onClick={()=>setView(
'doctorRegister'
)}
style={{
marginLeft:'10px'
}}
>
Doctor
</button>


<button
onClick={()=>setView(
'adminDashboard'
)}
style={{
marginLeft:'10px'
}}
>
Admin
</button>

</div>

)

}