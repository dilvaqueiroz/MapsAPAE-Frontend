import Leaflet from 'leaflet';

import mapMakerImgUsuario from '../images/usuario.png';

const mapIconUsuario = Leaflet.icon({
    iconUrl: mapMakerImgUsuario,
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [0, -60]
  })

  export default mapIconUsuario;