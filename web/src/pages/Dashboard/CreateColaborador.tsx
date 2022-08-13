import React, { FormEvent, useState, ChangeEvent } from "react";
import { Map,Marker,TileLayer } from 'react-leaflet';
import {LatLng, LeafletMouseEvent} from 'leaflet';
import { useHistory } from "react-router-dom";
import { Alert } from 'reactstrap'
import ReactLeafletSearch from "react-leaflet-search";

import {FiPlus, FiAlertCircle } from "react-icons/fi";


import Sidebar from "../../components/Sidebar";
import api from "../../services/api";

import '../../styles/pages/create-usuario.css';
import mapIconColaborador from "../../utils/mapIconColaborador";

//export default function CreateColaborador(){
  const CreateColaborador: React.FC = () => {

  const history=useHistory();
  const [position,setPosition] = useState({latitude:0,longitude:0});
  const [name, setName]=useState('');
  const [about,setAbout]=useState('');
  const [opening_hours,setOpeningHours]=useState('');
  const [cep,setCep]=useState('');
  const [street,setStreet]=useState('');
  const [number,setNumber]=useState('');
  const [district,setDistrict]=useState('');
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(false);
  const [mapVisible, setmapVisible] = useState(false);
  const [open_on_weekends,setOpenOnWeekends]=useState(true);
  const [images,setImages] = useState<File[]>([]);
  const [previewImages,setPreviewImages] = useState<string[]>([]);

  function handleMapClick(event: LeafletMouseEvent){
    const {lat,lng} = event.latlng;
    setPosition({
      latitude:lat,
      longitude:lng,
    });
    setmapVisible(false)
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

  // máscara para aceitar apenas números e colocar hífen no cep
  function mCEP(cep:string) {
    cep = cep.replace(/\D/g,"")
    cep = cep.replace(/(\d{3})(\d{1,3})$/,"$1-$2")
    return cep
  }

    // tempo de aparição do erro
    function alertRegister() {

      setVisible(true)
  
      window.setTimeout(() => {
        setVisible(false)
      }, 2000)
    }

  // pega o cep através da api viacep
  function getCep() {
    setError('')

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => response.json())
      .then(resp => {

        if(JSON.stringify(resp) === '{"erro":true}') {
          setError('CEP inválido!')
          alertRegister()
        } else {
          setCep(resp.cep)
          setStreet(resp.logradouro)
          setDistrict(resp.bairro)
        }
      })
      .catch(() => {
        setError('CEP inválido!')
        alertRegister()
      })

  }

  // retorna as informações do endereço como também a latitude e longitude
  function getGeolocalization() {

    if (street) {
      let street1 = street.split(" ").join("+")
      fetch(`https://nominatim.openstreetmap.org/search?country=Brazil&city=Serra%20Talhada&street=${street1}&limit=1&format=json`)
        .then((res) => res.json())
        .then((response) => setPosition({
          latitude: response[0].lat,
          longitude: response[0].lon
        }))
      setmapVisible(true)
    }

    console.log(cep)
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
    data.append('opening_hours',opening_hours);
    data.append('open_on_weekends',String(open_on_weekends));
    
    images.forEach(image =>{
      data.append('images',image);
    })

    try {
      await api.post('colaboradores',data).then(() => {
        alert('Cadastro realizado com sucesso!')
        history.push('/app');
      })
    } catch (e) {
      alert('Preencha todos os campos corretamente!');
    }

    //alteração teste

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
            <legend>Dados do Colaborador</legend>

            <div className="input-block">
              <label htmlFor="name">Nome do Colaborador</label>
              <input 
                id="name"
                value={name}
                onChange={event => setName(event.target.value)}
                />

            </div>

            {error !== '' ?
              <div className="input-block">
                <Alert className="alerta error" isOpen={visible} >
                  <FiAlertCircle className="alertCircle" size={20} />
                  <div>{error}</div>
                </Alert>
              </div> : null
            }

            <div className="input-block">
              <label htmlFor="cep">CEP:</label>
              <input 
                id="cep"
                value={cep}
                maxLength={9}
                onChange={event => setCep(mCEP(event.target.value))}
                />
            </div>

            <div className="input-block">
              <button
                type="button" id="button-c" onClick={() => getCep()}>
                Resgatar Endereço
              </button>
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
              <label htmlFor="about">Complemento:</label>
              <textarea 
                id="name"
                maxLength={300}
                value={about} 
                onChange={event => setAbout(event.target.value)}
              />
            </div>

            {/* <div className="input-block">
              <button type="button" id="button-c" onClick={() => getGeolocalization()}>
                  Selecione a Localização Geográfica
              </button>
            </div> */}

            <label htmlFor="localization">Selecione a Localização Geográfica</label>

            {/* {mapVisible === true ? */}

            <div className="input-block2">
              <Map
                center={[-7.987880130674069, -38.29668760299683]}
                style={{ width: '100%', height: 380 }}
                zoom={15}
                onclick={handleMapClick}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />

                <ReactLeafletSearch
                  position="topright"
                  inputPlaceholder="Buscar"
                  className="search-map"
                  showMarker={mapVisible}
                  zoom={15}
                  onChange={event => {
                    const {lat,lng} = event.latLng
                    setmapVisible(false)
                    setPosition({
                      latitude: lat,
                      longitude: lng
                    })
                    setmapVisible(true)
                  }}
                  markerIcon={mapIconColaborador}
                  closeResultsOnClick={true}
                  showPopup={false}
                  openSearchOnLoad={true}
                  providerOptions={{region: 'br'}}

                // default provider OpenStreetMap
                // provider="BingMap"
                // providerKey="AhkdlcKxeOnNCJ1wRIPmrOXLxtEHDvuWUZhiT4GYfWgfxLthOYXs5lUMqWjQmc27"
                />

                {position.latitude != 0 && (

                  <Marker
                    interactive={false}
                    icon={mapIconColaborador}
                    position={[
                      position.latitude,
                      position.longitude
                    ]}
                  />
                )}

              </Map>
            </div> {/* : null
            } */}

                
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
              <label htmlFor="opening_hours">Horários Disponiveis para Atendimento</label>
              <input 
                id="opening_hours"
                value={opening_hours} 
                onChange={event => {console.log(position.latitude, position.longitude) 
                  setOpeningHours(event.target.value)}}
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

export default CreateColaborador;
