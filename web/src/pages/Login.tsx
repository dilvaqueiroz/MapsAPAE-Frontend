import React, { useState } from 'react';

import  '../styles/pages/usuario-login.css';

function initialState() {
    return { user: '', password: '' }
}

function Login(){

    const [user, setUser] = useState(initialState().user)
    const [password, setPassword] = useState(initialState().password)

    return(
        <div id="user-login">
            <h1 className="user-login__title">Acessar o Sistema</h1>
            <form>
                <div className="user-login__form-control">
                    <label htmlFor="user">Usuário</label>
                    <input id="user" type="text" name="user" value={user} onChange={event => setUser(event.target.value)} />
                </div>
                <div className="user-login__form-control">
                    <label htmlFor="password">Senha</label>
                    <input id="password" type="password" name="password" value={password} onChange={event => setPassword(event.target.value)} />
                </div>
                <div className="user-login__form-control">
                    <button className="user-login__submit-button">Entrar</button>
                </div>
            </form>
        </div>
    );
}

export default Login;