import { Link } from "react-router-dom";

export function PatientList(props) {
  if(!props.patientIds) {
    return null;
  }
  
  return (
    <>
    <h2>Lista de Pacientes</h2>
      <ul>
        {props.patientIds.map((patientId, idx) => 
          <li key={idx}> 
            <Link to={`/patient/${patientId}`}>{patientId}</Link>
          </li>
        )}
      </ul>
    </>
  )
}