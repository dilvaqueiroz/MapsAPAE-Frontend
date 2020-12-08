import React, {useState,Component} from 'react';
import {FiLogIn} from 'react-icons/fi';
import logoImg from '../../images/logo.png';
import {useAuth} from '../../contexts/auth';
import  '../../styles/pages/landing.css';
import { Redirect } from 'react-router-dom';


const Landing: React.FC = () => {

  const {signed, signIn} = useAuth();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

    function handleSignIn() {
      signIn(user, password);
    }


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

              <input 
              id="user" 
              type="text" 
              value={user} 
              onChange={event => setUser(event.target.value)} 
              />

              <label htmlFor="password">Senha:</label>
              
              <input 
              id="password" 
              type="password" 
              value={password} 
              onChange={event => setPassword(event.target.value)} 
              />

              <button className="enter-app" type="submit" onClick={handleSignIn} >
                <FiLogIn size={20} color="rgba(0,0,0,0.6)"></FiLogIn>
                Entrar
              </button>

              {/*<Link to="/app" className="enter-app">
              <FiArrowRight size={26} color="rgba(0,0,0,0.6)">Entrar</FiArrowRight>
                </Link>*/}

            </div>

            <div className="content-footer">
              <strong>Serra Talhada</strong>
              <span>Pernambuco</span>
            </div>

            <Redirect to={{
        pathname:'/App',
      }} />
        </div>
      </div>
    );
};

export default Landing;