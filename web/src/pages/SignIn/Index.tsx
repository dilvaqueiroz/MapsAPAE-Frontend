import React, {useState,Component} from 'react';
import {FiLogIn,FiEdit} from 'react-icons/fi';
import logoImg from '../../images/logo.png';
import {useAuth} from '../../contexts/auth';
import  '../../styles/pages/landing.css';


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
              <h1>Mapeamento geográfico da rede da APAE </h1>
              <p>Colabore com a APAE na sua missão de Educação Inclusiva.</p>
            </main>
  
            <div className="location">
              <label htmlFor="user">Login:  </label>

              <input 
              className="text-input"
              id="user" 
              type="text" 
              value={user} 
              onChange={event => setUser(event.target.value)} 
              />

              <label htmlFor="password">Senha:</label>
              
              <input 
              className="text-input"
              id="password" 
              type="password" 
              value={password} 
              onChange={event => setPassword(event.target.value)} 
              />

              <div className="buttons-location">
                <button className="registration-app" type="submit"  >
                  <FiEdit size={20} color="#fff"></FiEdit>
                  Cadastre-se
                </button>
                
                <button className="enter-app" type="submit" onClick={handleSignIn} >
                  <FiLogIn size={20} color="#fff"></FiLogIn>
                  Entrar
                </button>
              </div>

              {/*<Link to="/app" className="enter-app">
              <FiArrowRight size={26} color="rgba(0,0,0,0.6)">Entrar</FiArrowRight>
                </Link>*/}

            </div>

            <div className="content-footer">
              <strong>Serra Talhada</strong>
              <span>Pernambuco</span>
            </div>

         {/*<Redirect to={{
        pathname:'/App',
      }} /> */} 

        </div>
      </div>
    );
};

export default Landing;