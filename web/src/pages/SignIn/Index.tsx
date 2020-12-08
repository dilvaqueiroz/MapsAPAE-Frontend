import { stringify } from 'querystring';
import React, {useState} from 'react';
import {FiArrowRight} from 'react-icons/fi';
import {Link} from 'react-router-dom';
import logoImg from '../../images/logo.png';
import  '../../styles/pages/landing.css';

function initialState() {
    return { user: '', password: stringify}
}


const Landing: React.FC = () => {

  const [user, setUser] = useState(initialState().user)
  const [password, setPassword] = useState(initialState().password)

 

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
              <label htmlFor="user">Login:  </label>
              <input id="user" type="text" name="user" value={user} onChange={event => setUser(event.target.value)} />
              <label htmlFor="password">Senha:  </label>
              <input id="password" type="password" name="password" value={password} onChange={event => setPassword(event.target.value)} />
              <Link to="/app" className="enter-app">
              <FiArrowRight size={26} color="rgba(0,0,0,0.6)">Entrar</FiArrowRight>
              </Link>
            </div>
            <div className="content-footer">
            <strong>Serra Talhada</strong>
            <span>Pernambuco</span>
            </div>
        </div>
      </div>
    );
};

export default Landing;