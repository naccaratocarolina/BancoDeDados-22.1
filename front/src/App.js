import { Link } from "react-router-dom";

export default function App() {
  return (
    <div>
      <h1>DataSUS</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <ul>
          <li>
            <Link to="/patients">Pacientes</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}