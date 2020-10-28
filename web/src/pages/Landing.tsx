import React from 'react';
import {FiArrowRight} from 'react-icons/fi';
import {Link} from 'react-router-dom';

import logoImg from '../images/logo.png';

import  '../styles/pages/landing.css';



function Landing(){
    return(
        <div id="page-landing">
        <div className="content-wrapper">
            <div className="content-logo">
            <img src={logoImg} alt="Maps APAE"/>
              <h1>Maps APAE</h1>
              </div>
            
            <main>
              <h1>Entregas De Atividades Impressas</h1>
              <p>Colabore com a APAE na sua missão de Educação Inclusiva.</p>
            </main>
  
            <div className="location">
              <strong>Serra Talhada</strong>
              <span>Pernambuco</span>
            </div>
  
            <Link to="/app" className="enter-app">
              <FiArrowRight size={26} color="rgba(0,0,0,0.6)"/>
            </Link>
        </div>
      </div>
    );
}

export default Landing;