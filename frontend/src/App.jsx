import React,{useState} from 'react'

import Landing from './components/Landing'
import PatientLogin from './components/PatientLogin'
import DoctorLogin from './components/DoctorLogin'
import PatientRegister from './components/PatientRegister'
import DoctorRegister from './components/DoctorRegister'
import PatientDashboard from './components/PatientDashboard'
import DoctorDashboard from './components/DoctorDashboard'

function App(){

const [view,setView]=useState('landing')

return(

<>

{view==='landing' &&
<Landing setView={setView}/>
}

{view==='patientLogin' &&
<PatientLogin setView={setView}/>
}

{view==='patientRegister' &&
<PatientRegister setView={setView}/>
}

{view==='doctorLogin' &&
<DoctorLogin setView={setView}/>
}

{view==='doctorRegister' &&
<DoctorRegister setView={setView}/>
}

{view==='patientDashboard' &&
<PatientDashboard setView={setView}/>
}

{view==='doctorDashboard' &&
<DoctorDashboard setView={setView}/>
}

</>

)

}

export default App