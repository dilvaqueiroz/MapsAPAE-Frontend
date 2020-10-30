import React from "react";
import { FiClock, FiInfo} from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import {useParams} from 'react-router-dom';

import '../styles/pages/usuario.css';
import Sidebar from "../components/Sidebar";
import mapIconUsuario from "../utils/mapIconUsuario";
import { useEffect } from "react";
import { useState } from "react";
import api from "../services/api";

interface Usuario{
  latitude:number;
  longitude:number;
  name:string;
  cep:string;
  street: string;
  number:string;
  district:string;
  about:string;
  instructions:string;
  opening_hours:string;
  open_on_weekends:boolean;
  images:Array<{
    id:number;
    url:string;
  }>;
}

interface UsuarioParams{
  id:string;
}

export default function Usuario() {

  const params= useParams<UsuarioParams>();
  const [usuario,setUsuario] = useState<Usuario>();
  const [activeImageIndex,setActivateImageIndex] = useState(0);
  

  useEffect(() =>{
      api.get(`usuarios/${params.id}`).then(response =>{
         setUsuario(response.data);
      })
  },[params.id]);

if(!usuario){
  return <p>Carregando...</p>
}

  return (
    <div id="page-usuario">
      <Sidebar/>

      <main>
        <div className="usuario-details">
          <img src={usuario.images[activeImageIndex].url} alt={usuario.name} />

          <div className="images">
           {usuario.images.map((image,index) => {
             return(
              <button 
                key={image.id} 
                className={activeImageIndex == index ? 'active' : ''}
                type="button"
                onClick={()=>{
                  setActivateImageIndex(index);
                }}
              >
                <img src={image.url} alt={usuario.name} />
              </button>
             );
           })}
            
          </div>
          
          <div className="usuario-details-content">
            <h1>{usuario.name}</h1>
            <p>{usuario.district}</p>
            <p>{usuario.street}</p>
            <p>{usuario.number}</p>
            <p>{usuario.about}</p>
            

            <div className="map-container">
              <Map 
                center={[usuario.latitude,usuario.longitude]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer 
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker interactive={false} icon={mapIconUsuario} position={[usuario.latitude,usuario.longitude]} />
              </Map>

              <footer>
                <a target="blank" rel="noopener noreferrer"  href={`https://www.google.com/maps/dir/?api=1&destination=${usuario.latitude},${usuario.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{usuario.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {usuario.opening_hours}
              </div>
              {usuario.open_on_weekends ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  Estamos em casa <br />
                  fim de semana
                </div>
              ) :(
                <div className="open-on-weekends dont-open">
                  <FiInfo size={32} color="#FF669D" />
                  Não estamos em casa <br />
                  fim de semana
                </div>
                )}
              </div>
          </div>
        </div>
      </main>
    </div>
  );
}