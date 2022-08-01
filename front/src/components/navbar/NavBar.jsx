import React from 'react';
import './NavBar.css';
import { default as logo } from '../../logo.svg';
import {BrowserRouter as Router, Link} from 'react-router-dom';


export default function Navbar(){
    return <nav className = "nav">
        <ul>
        <Link to="/">
            <img src={logo} href="/"  className="logo"></img>
        </Link>
        <a href="/" className='title'>DataSus</a>
        </ul>
        <ul>
            <li>
                <a href="/patients">Pacientes</a>
            </li>
            <li>
                <a href="/vaccines">Vacinas</a>
            </li>
            <li>
                <a href="/fabricators">Fabricantes</a>
            </li>
        </ul>

    </nav>
}