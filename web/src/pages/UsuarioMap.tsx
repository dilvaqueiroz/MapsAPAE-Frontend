import React, {FormEvent, useEffect,useState} from 'react';
import{Link} from 'react-router-dom';
import {FiPlus,FiArrowRight} from 'react-icons/fi';
import {Map,TileLayer,Marker,Popup, Circle} from 'react-leaflet';

import mapMakerImg from '../images/logo.png';

import '../styles/pages/usuario-map.css';
import mapIcon from '../utils/mapIconUsuario';
import api from '../services/api';
import mapIconColaborador from '../utils/mapIconColaborador';
import mapIconDoador from '../utils/mapIconDoador';
import mapIconUsuario from '../utils/mapIconUsuario';
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

function UsuarioMap(){

    const [usuarios,setUsuario] = useState<Usuario[]>([]);
    const [doadores,setDoador] = useState<Doador[]>([]);
    const [colaboradores,setColaborador] = useState<Colaborador[]>([]);
    const [name,setName] = useState('');
    const [doadores2,setDoador2] = useState<Doador[]>([]);
    
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
    }

    function openPopup(name: string) {
        if(doadores2 != null) {
            const d = doadores2.forEach(doador => {
                if(doador.name === name) {
                    return true
                } else {
                    return false
                }
            })

            return d
        } else {
            return false
        }
    }

    return(
        <div id="page-map">
            <aside>
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
                            }): null}
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

export default UsuarioMap;