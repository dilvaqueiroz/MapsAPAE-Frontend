import mapIconColaborador from "./mapIconColaborador";
import mapIconDoador from "./mapIconDoador";
import mapIconUsuario from "./mapIconUsuario";

export function getMarkerIcon(type_user: string): L.Icon {
    switch (type_user) {
        case "usuario":
            return mapIconUsuario;
        case "colaborador":
            return mapIconColaborador;
        case "doador":
            return mapIconDoador;
        default:
            return mapIconUsuario;
    }
  }