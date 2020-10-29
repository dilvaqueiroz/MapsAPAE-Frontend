import React from "react";
import { FiClock, FiInfo} from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import {useParams} from 'react-router-dom';

import '../styles/pages/usuario.css';
import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";
import { useEffect } from "react";
import { useState } from "react";
import api from "../services/api";

interface Doador{
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

interface DoadorParams{
  id:string;
}

export default function Doador() {

  const params= useParams<DoadorParams>();
  const [doador,setDoador] = useState<Doador>();
  const [activeImageIndex,setActivateImageIndex] = useState(0);
  

  useEffect(() =>{
      api.get(`doadores/${params.id}`).then(response =>{
         setDoador(response.data);
      })
  },[params.id]);

if(!doador){
  return <p>Carregando...</p>
}

  return (
    <div id="page-usuario">
      <Sidebar/>

      <main>
        <div className="usuario-details">
          <img src={doador.images[activeImageIndex].url} alt={doador.name} />

          <div className="images">
           {doador.images.map((image,index) => {
             return(
              <button 
                key={image.id} 
                className={activeImageIndex == index ? 'active' : ''}
                type="button"
                onClick={()=>{
                  setActivateImageIndex(index);
                }}
              >
                <img src={image.url} alt={doador.name} />
              </button>
             );
           })}
            
          </div>
          
          <div className="usuario-details-content">
            <h1>{doador.name}</h1>
            <p>{doador.district}</p>
            <p>{doador.street}</p>
            <p>{doador.number}</p>
            <p>{doador.about}</p>

            <div className="map-container">
              <Map 
                center={[doador.latitude,doador.longitude]} 
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
                <Marker interactive={false} icon={mapIcon} position={[doador.latitude,doador.longitude]} />
              </Map>

              <footer>
                <a target="blank" rel="noopener noreferrer"  href={`https://www.google.com/maps/dir/?api=1&destination=${doador.latitude},${doador.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {doador.opening_hours}
              </div>
              {doador.open_on_weekends ? (
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