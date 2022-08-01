import React from 'react';
import './Home.css';
import { default as logo } from '../../logo.svg';
import {BrowserRouter as Router, Link} from 'react-router-dom';


export default function Home(){
    return <div className='main'>
        <div className='headline'>
            <Link to="/">
                <img src={logo} href="/"  className="logo_main"></img>
            </Link>
            <a href="/" className='title_main'>DataSus</a>
        </div>
        <div className='text_container'>
            <text className='text_main'>Sistema Único de Saúde (SUS) é a denominação do sistema público de saúde brasileiro criado pela Constituição Federal de 1988.
                Realiza desde atendimentos primários até procedimentos complexos e oferece atendimento de emergência para pessoas que sofrem acidentes
                pelo Serviço de Atendimento Móvel de Urgência.  sistema de saúde brasileiro também fornece vacinas e remédios gratuitamente para pessoas
                com diversas doenças e financia pesquisas na área de epidemiologia. Entre os países com mais de 200 milhões de habitantes, o Brasil é o
                único que possui um sistema de saúde pública universal totalmente financiado pelo Estado.</text>
        </div>
    </div>
}