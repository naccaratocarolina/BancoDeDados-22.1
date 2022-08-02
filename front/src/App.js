import { Link } from "react-router-dom";
import Navbar from "./components/navbar/NavBar"
import Home from "./components/home/Home"

export default function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Home></Home>
    </div>
  );
}