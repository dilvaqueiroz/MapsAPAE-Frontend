import Leaflet from 'leaflet';

import mapMakerImgDoador from '../images/doador.png';

const mapIconDoador = Leaflet.icon({
    iconUrl: mapMakerImgDoador,
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [0, -60]
  })

  export default mapIconDoador;