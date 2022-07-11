import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from "./App";
import { Patients } from "./routes/patients";
import { Patient } from "./routes/patient";
import { Vaccines } from "./routes/vaccines";
import { Fabricators } from "./routes/fabricators";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="patients" element={<Patients />} />
      <Route path="patient/:patientId" element={<Patient />} />
      <Route path="vaccines" element={<Vaccines />} />
      <Route path="fabricators" element={<Fabricators />} />
    </Routes>
  </BrowserRouter>
);