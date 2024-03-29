import React from "react";
import { FiArrowRight, FiClock, FiInfo} from "react-icons/fi";

import Sidebar from "../../components/Sidebar";
import '../../styles/pages/selection.css';
import { Link } from "react-router-dom";

//export default function Selection() {
  const Selection: React.FC = () => {

    return (
        <div id="page-usuario">
          <Sidebar/>
    
          <main>
            <div className="usuario-details">
                  
                            
              <div className="usuario-details-content">
              
                <h2>Deseja Cadastrar</h2>
                <hr/>
                <div className="open-details flex">
                  <div  >
                   <Link to="/usuarios/create" className="config-button">
                       Usuário
                   </Link>
                  </div>
                   <div  >
                   <Link to="/doadores/create" className="config-button1">
                       Doador
                   </Link>
                    </div>
                    <div  >
                    <Link to="/colaboradores/create" className="config-button2">
                       Colaborador
                   </Link>
                    </div>
                  </div>
              </div>
            </div>
          </main>
        </div>
      );
    }

    export default Selection;