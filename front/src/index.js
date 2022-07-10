import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from "./App";
import Patients from "./routes/patients";
import Patient from "./routes/patient";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="patients" element={<Patients />} />
      <Route path="patient/:patientId" element={<Patient />} />
    </Routes>
  </BrowserRouter>
);