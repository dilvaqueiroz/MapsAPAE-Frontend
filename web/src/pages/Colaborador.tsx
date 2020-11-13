import React from "react";
import { FiClock, FiInfo} from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import {useParams,Link} from 'react-router-dom';

import '../styles/pages/usuario.css';
import Sidebar from "../components/Sidebar";
import mapIconColaborador from "../utils/mapIconColaborador";
import { useEffect } from "react";
import { useState } from "react";
import api from "../services/api";

interface Colaborador{
  latitude:number;
  longitude:number;
  name:string;
  cep:string;
  street:string;
  number:string;
  district:string;
  about:string;
  opening_hours:string;
  open_on_weekends:boolean;
  images:Array<{
    id:number;
    url:string;
  }>;
}

interface ColaboradorParams{
  id:string;
}

export default function Colaborador() {

  const params= useParams<ColaboradorParams>();
  const [colaborador,setColaborador] = useState<Colaborador>();
  const [activeImageIndex,setActivateImageIndex] = useState(0);
  

  useEffect(() =>{
      api.get(`colaboradores/${params.id}`).then(response =>{
         setColaborador(response.data);
      })
  },[params.id]);

if(!colaborador){
  return <p>Carregando...</p>
}

  return (
    <div id="page-usuario">
      <Sidebar/>

      <main>
        <div className="usuario-details">
          <img src={colaborador.images[activeImageIndex].url} alt={colaborador.name} />

          <div className="images">
           {colaborador.images.map((image,index) => {
             return(
              <button 
                key={image.id} 
                className={activeImageIndex == index ? 'active' : ''}
                type="button"
                onClick={()=>{
                  setActivateImageIndex(index);
                }}
              >
                <img src={image.url} alt={colaborador.name} />
              </button>
             );
           })}
            
          </div>
          
          <div className="usuario-details-content">
            <div className="div-change">
              <h1>{colaborador.name}</h1>
              <Link to={`/collaborators/${params.id}/change`} className="config-button-change">
                      Editar
              </Link>
            </div>
            <p>{colaborador.district}</p>
            <p>{colaborador.street}</p>
            <p>{colaborador.number}</p>
            <p>{colaborador.about}</p>

            <div className="map-container">
              <Map 
                center={[colaborador.latitude,colaborador.longitude]} 
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
                <Marker interactive={false} icon={mapIconColaborador} position={[colaborador.latitude,colaborador.longitude]} />
              </Map>

              <footer>
                <a target="blank" rel="noopener noreferrer"  href={`https://www.google.com/maps/dir/?api=1&destination=${colaborador.latitude},${colaborador.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {colaborador.opening_hours}
              </div>
              {colaborador.open_on_weekends ? (
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