import React, { FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight, FiLogOut } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { useAuth } from '../../contexts/auth';
import mapMakerImg from '../../images/logo.png';
import '../../styles/pages/usuario-map.css';
import api from '../../services/api';
import { getMarkerIcon } from '../../utils/Utils';

interface Usuario {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
    type_user: string;
  }
  
  const NavigationMap: React.FC = () => {
    const { signOut } = useAuth();
  
    function handleSignOut() {
      signOut();
    }
  
    const [usuarios, setUsuario] = useState<Usuario[]>([]);
    const [name, setName] = useState('');
    const [filteredUsuarios, setFilteredUsuarios] = useState<Usuario[]>([]);
  
    useEffect(() => {
      api.get('usuarios').then(response => {
        setUsuario(response.data);
      });
    }, []);
  
    async function handleSubmit(event: FormEvent) {
      event.preventDefault();
  
      try {
        const response = await api.get(`usuarios/${name}/name`);
        setFilteredUsuarios(response.data);
      } catch (e) {
        console.log('Usuário não existe');
      }
    }
  
    return (
      <div id="page-map">
        <aside>
          <button className="out-app" onClick={handleSignOut}>
            <FiLogOut size={20} color="#fff" />
          </button>
          <header>
            <img src={mapMakerImg} alt="Maps APAE" />
            <h2>Escolha um Endereço no Mapa</h2>
            <p>Colabore com educação inclusiva :)</p>
          </header>
          <footer>
            <strong>Serra Talhada</strong>
            <span>Pernambuco</span>
          </footer>
        </aside>
  
        <div id="sidebar">
          <div className="search-forms standard-form">
            <form onSubmit={handleSubmit} className="search_form">
              <input type="submit" className="float" value="Ok" />
              <div className="query_wrapper">
                <input
                  id="name"
                  type="text"
                  placeholder="Buscar"
                  className="overflow"
                  value={name}
                  onChange={event => setName(event.target.value)}
                />
              </div>
            </form>
          </div>
        </div>
  
        <Map
          center={[-7.9933402, -38.3008299]}
          zoom={15}
          style={{ width: '100%', height: '100%' }}
        >
          <TileLayer
            url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
          />
          {usuarios.map(usuario => (
            <Marker
              key={usuario.id}
              icon={getMarkerIcon(usuario.type_user)}
              position={[usuario.latitude, usuario.longitude]}
            >
              <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                {usuario.name}
                <Link to={`/usuarios/${usuario.id}`}>
                  <FiArrowRight size={20} color="#fff" />
                </Link>
              </Popup>
              {filteredUsuarios.length > 0 && filteredUsuarios.map(filteredUsuario => {
                if (filteredUsuario.name === usuario.name) {
                  return (
                    <Circle
                      key={filteredUsuario.id}
                      center={{ lat: filteredUsuario.latitude, lng: filteredUsuario.longitude }}
                      fillColor="green"
                      radius={30}
                    />
                  );
                }
              })}
            </Marker>
          ))}
        </Map>
  
        <Link to="/usuarios/create" className="create-usuario">
          <FiPlus size={32} color="#fff" />
        </Link>
      </div>
    );
  };
  
  export default NavigationMap;