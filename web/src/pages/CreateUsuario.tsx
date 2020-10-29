import React, { FormEvent, useState, ChangeEvent } from "react";
import { Map,Marker,TileLayer } from 'react-leaflet';
import {LeafletMouseEvent} from 'leaflet';
import { useHistory } from "react-router-dom";

import {FiPlus } from "react-icons/fi";


import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";
import api from "../services/api";

import '../styles/pages/create-usuario.css';

export default function CreateUsuario() {

  const history=useHistory();

  const [position,setPosition] = useState({latitude:0,longitude:0});
  const [name, setName]=useState('');
  const [about,setAbout]=useState('');
  const [instructions,setInstructions]=useState('');
  const [opening_hours,setOpeningHours]=useState('');
  const [cep,setCep]=useState('');
  const [street,setStreet]=useState('');
  const [number,setNumber]=useState('');
  const [district,setDistrict]=useState('');
  const [open_on_weekends,setOpenOnWeekends]=useState(true);
  const [images,setImages] = useState<File[]>([]);
  const [previewImages,setPreviewImages] = useState<string[]>([]);

  function handleMapClick(event: LeafletMouseEvent){
    const {lat,lng} = event.latlng;
    setPosition({
      latitude:lat,
      longitude:lng,
    });
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>){
    if(!event.target.files){
      return;
    }

    const selectedImages = Array.from(event.target.files);
    
    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map( image=>{
      return URL.createObjectURL(image);
    });

    setPreviewImages(selectedImagesPreview);
  }


  function mCEP(cep:string) {
    cep = cep.replace(/\D/g,"")
    cep = cep.replace(/(\d{3})(\d{1,3})$/,"$1-$2")
    return cep
  }

  async function handleSubmit(event:FormEvent){
    event.preventDefault();

    const {latitude,longitude} = position;

    const data = new FormData();

    data.append('name',name);
    data.append('cep',cep);
    data.append('street',street);
    data.append('number',number);
    data.append('district',district);
    data.append('about',about);
    data.append('latitude',String(latitude));
    data.append('longitude',String(longitude));
    data.append('instructions',instructions);
    data.append('opening_hours',opening_hours);
    data.append('open_on_weekends',String(open_on_weekends));
    
    images.forEach(image =>{
      data.append('images',image);
    })

    await api.post('usuarios',data);

    alert('Cadastro realizado com sucesso!');

    history.push('/app');

  /*  console.log({
      position,
      name,
      about,
      latitude,
      longitude,
      instructions,
      opening_hours,
      open_on_weekends,
      images,
    })*/
  }

  return (
    <div id="page-create-usuario">
     <Sidebar/>
      <main>
        <form onSubmit={handleSubmit} className="create-usuario-form">
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-7.9933402,-38.3008299]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handleMapClick}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

            { position.latitude != 0 && (
            
            <Marker 
              interactive={false} 
              icon={mapIcon} 
              position={[
                position.latitude,
                position.longitude
                  ]} 
                />
              )}

            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome do Residente</label>
              <input 
                id="name"
                value={name}
                onChange={event => setName(event.target.value)}
                />

            </div>

            <div className="input-block">
              <label htmlFor="cep">CEP:</label>
              <input 
                id="cep"
                value={cep}
                maxLength={9}
                onChange={event => setCep(mCEP(event.target.value))}
                />
                {console.log(mCEP(cep))}
            </div>

            <div className="input-block">
              <label htmlFor="street">Rua:</label>
              <input
                id="street"
                value={street}
                maxLength={100}
                disabled={true}
                onChange={event => setStreet(event.target.value)}
                />

            </div>

            <div className="input-block">
              <label htmlFor="number">Número:</label>
              <input 
                id="number"
                value={number}
                maxLength={4}
                onChange={event => setNumber(event.target.value)}
                />

            </div>

            <div className="input-block">
              <label htmlFor="district">Bairro:</label>
              <input 
                id="district"
                value={district}
                maxLength={50}
                onChange={event => setDistrict(event.target.value)}
                />

            </div>


            <div className="input-block">
              <label htmlFor="about">Complemento:</label>
              <textarea 
                id="name"
                maxLength={300}
                value={about} 
                onChange={event => setAbout(event.target.value)}
              />
            </div>

                
            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
              {previewImages.map(image => {
                  return (
                    <img key={image} src={image} alt={name}/>
                  )
                })}
                <label  htmlFor="image[]"className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
               
              </div>
              <input multiple onChange={handleSelectImages} type="file" id="image[]"/>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções Quando Não Houver Alguém em Casa</label>
              <textarea
               id="instructions" 
               value={instructions} 
               onChange={event => setInstructions(event.target.value)}
               />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horários Disponiveis para Receber Atividades</label>
              <input 
                id="opening_hours"
                value={opening_hours} 
                onChange={event => setOpeningHours(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Estou em casa fim de semana</label>

              <div className="button-select">
                <button
                 type="button"
                className={open_on_weekends ? 'active' : ''}
                onClick={()=>setOpenOnWeekends(true)}
                >
                  Sim
                </button>
                <button 
                  type="button"
                  className={!open_on_weekends ? 'active' : ''}
                  onClick={()=>setOpenOnWeekends(false)}
                  >
                    Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}
