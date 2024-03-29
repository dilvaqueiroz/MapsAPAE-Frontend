import React, {FormEvent, useEffect,useState} from 'react';
import{Link} from 'react-router-dom';
import {FiPlus,FiArrowRight,FiLogOut} from 'react-icons/fi';
import {Map,TileLayer,Marker,Popup, Circle} from 'react-leaflet';
import {useAuth} from '../../contexts/auth';

import mapMakerImg from '../../images/logo.png';

import '../../styles/pages/usuario-map.css';
import api from '../../services/api';
import mapIconColaborador from '../../utils/mapIconColaborador';
import mapIconDoador from '../../utils/mapIconDoador';
import mapIconUsuario from '../../utils/mapIconUsuario';
/* import { Tooltip } from 'reactstrap'; */

interface Usuario{
    id:number;
    latitude:number;
    longitude:number;
    name:string;
}

interface Doador{
    id:number;
    latitude:number;
    longitude:number;
    name:string;
}

interface Colaborador{
    id:number;
    latitude:number;
    longitude:number;
    name:string;
}

//function NavigationMap(){
const NavigationMap: React.FC = () => {

    const {signOut, user} = useAuth();	

    function handleSignOut(){	
    signOut();	
  }

    const [usuarios,setUsuario] = useState<Usuario[]>([]);
    const [doadores,setDoador] = useState<Doador[]>([]);
    const [colaboradores,setColaborador] = useState<Colaborador[]>([]);
    const [name,setName] = useState('');
    const [usuarios2,setUsuario2] = useState<Usuario[]>([]);
    const [doadores2,setDoador2] = useState<Doador[]>([]);
    const [colaboradores2,setColaborador2] = useState<Colaborador[]>([]);
    const [usuarios3,setUsuario3] = useState<Usuario[]>([]);
    const [doadores3,setDoador3] = useState<Doador[]>([]);
    const [colaboradores3,setColaborador3] = useState<Colaborador[]>([]);
    
    useEffect(() =>{
        api.get('colaboradores').then(response =>{
           setColaborador(response.data);
        })
    },[]);

    useEffect(() =>{
        api.get('usuarios').then(response =>{
           setUsuario(response.data);
        })
    },[]);

    useEffect(() =>{
        api.get('doadores').then(response =>{
           setDoador(response.data);
        })
    },[]);

    async function handleSubmit(event:FormEvent) {
        event.preventDefault();

        try {
            await api.get(`doadores/${name}/name`).then(res => setDoador2(res.data))
        } catch(e) {
            console.log('Usuário não existe!')
        }

        try{
            await api.get(`usuarios/${name}/name`).then(res => setUsuario2(res.data))
        } catch(e) {
            console.log('Usuário não existe')
        }

        try {
            await api.get(`colaboradores/${name}/name`).then(res => setColaborador2(res.data))
        } catch(e) {
            console.log('Usuário não existe')
        }
    }

    async function handleSubmit2(event:FormEvent) {
        event.preventDefault();

        try {
            await api.get(`doadores/${name}/name`).then(res => setDoador3(res.data))
        } catch(e) {
            console.log('Usuário não existe!')
        }

        try{
            await api.get(`usuarios/${name}/name`).then(res => setUsuario3(res.data))
        } catch(e) {
            console.log('Usuário não existe')
        }

        try {
            await api.get(`colaboradores/${name}/name`).then(res => setColaborador3(res.data))
        } catch(e) {
            console.log('Usuário não existe')
        }
    }

    return(
        <div id="page-map">
            <aside>
                <button className="out-app" onClick={handleSignOut}>	
                    <FiLogOut size={20} color="#fff"></FiLogOut>	
                </button>
                <header>
                    <img src={mapMakerImg} alt="Maps APAE"/>

                    <h2>Escolha um Endereço no Mapa</h2>
                    <p>Colabore com educação inclusiva :)</p>
                </header>

                <footer>
                    <strong>Serra Talhada</strong>
                    <span>Pernambuco</span>
                </footer>
            </aside>

            <div>
                <div id="sidebar">
                        <div className="search-forms standard-form">
                            <form onSubmit={handleSubmit} className="search_form">
                                {/* <input type="text" className="search"></input> */}
                                <input type="submit"
                                className="float" value="Ok" />
                                <div className="query_wrapper">
                                    <input id="name" type="text" 
                                    placeholder="Buscar" className="overflow"
                                    value={name} onChange={event => {
                                        setName(event.target.value)
                                        handleSubmit2(event)
                                        
                                        if(doadores3 !== null) {
                                            doadores3.map(d => {
                                                console.log(d.name)
                                            })
                                        }
                                    }} />
                                </div>
                            </form>
                        </div>
                </div>
            </div>
            
            <Map
                center={[-7.9933402,-38.3008299]}
                zoom={15}
                style={{ width: '100%', height: '100%' }}
                >
                   <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}/> 
                   {/* <TileLayer url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png' />*/}
                   
                {usuarios.map(usuario =>{
                    return(
                        <Marker
                                key={usuario.id}
                                icon={mapIconUsuario}
                                position={[usuario.latitude,usuario.longitude]}  
                            >
                            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                                {usuario.name}
                                <Link to={`/usuarios/${usuario.id}`}>
                                    <FiArrowRight size={20} color = "#fff" />
                                </Link>
                            </Popup>
                            {usuarios2 != null ? usuarios2.map(d => {
                                if(d.name === usuario.name) {
                                    return (
                                        <Circle
                                            key={d.id}
                                            center={{ lat: d.latitude, lng: d.longitude }}
                                            fillColor="green"
                                            radius={30} />
                                    )
                                }
                            }) : null}
                        </Marker>
                       )
                   })}

                    {colaboradores.map(colaborador =>{
                    return(
                        <Marker
                                key={colaborador.id}
                                icon={mapIconColaborador}
                                position={[colaborador.latitude,colaborador.longitude]}
                            >
                            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                                {colaborador.name}
                                <Link to={`/colaboradores/${colaborador.id}`}>
                                    <FiArrowRight size={20} color = "#fff" />
                                </Link>
                            </Popup>
                            {colaboradores2 != null ? colaboradores2.map(d => {
                                if(d.name === colaborador.name) {
                                    return (
                                        <Circle
                                            key={d.id}
                                            center={{ lat: d.latitude, lng: d.longitude }}
                                            fillColor="green"
                                            radius={30} />
                                    )
                                }
                            }) : null}
                        </Marker>
                       )
                   })}

                    {doadores.map(doador =>{
                    return(
                        <Marker
                                key={doador.id}
                                icon={mapIconDoador}
                                position={[doador.latitude,doador.longitude]}  
                            >
                            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                                {doador.name}
                                <Link to={`/doadores/${doador.id}`}>
                                    <FiArrowRight size={20} color = "#fff" />
                                </Link>
                            </Popup>
                            {doadores2 != null ? doadores2.map(d => {
                                if(d.name === doador.name) {
                                    return (
                                        <Circle
                                            key={d.id}
                                            center={{ lat: d.latitude, lng: d.longitude }}
                                            fillColor="green"
                                            radius={30} />
                                    )
                                }
                            }) : null}
                        </Marker>
                       )
                   })}
                  
            </Map>

            <Link to="/selection" className="create-usuario">
                <FiPlus size={32} color= "#fff"/>
            </Link>
        </div>
    );
}

export default NavigationMap;