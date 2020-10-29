import React, {useEffect,useState} from 'react';
import{Link} from 'react-router-dom';
import {FiPlus,FiArrowRight} from 'react-icons/fi';
import {Map,TileLayer,Marker,Popup} from 'react-leaflet';

import mapMakerImg from '../images/logo.png';

import '../styles/pages/usuario-map.css';
import mapIcon from '../utils/mapIcon';
import api from '../services/api';

interface Usuario{
    id:number;
    latitude:number;
    longitude:number;
    name:string;
}

function UsuarioMap(){

    const [usuarios,setUsuario] = useState<Usuario[]>([]);

    useEffect(() =>{
        api.get('usuarios').then(response =>{
           setUsuario(response.data);
        })
    },[]);


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
                                icon={mapIcon}
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
                  
            </Map>

            <Link to="/selection" className="create-usuario">
                <FiPlus size={32} color= "#fff"/>
            </Link>
        </div>
    );
}

export default UsuarioMap;