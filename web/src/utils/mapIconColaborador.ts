import Leaflet from 'leaflet';

import mapMakerImgColaborador from '../images/colaborador.png';

const mapIconColaborador= Leaflet.icon({
    iconUrl: mapMakerImgColaborador,
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [0, -60]
  })

  export default mapIconColaborador;