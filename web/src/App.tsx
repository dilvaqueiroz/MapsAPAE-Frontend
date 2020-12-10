import React from 'react'
import {AuthProvider} from './contexts/auth';
import './styles/global.css';
import 'leaflet/dist/leaflet.css';
import Routes from './routes/index';
import { BrowserRouter } from 'react-router-dom';

const App:React.FC = () => {
  return (
    <BrowserRouter>
     <AuthProvider >
        <Routes/>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
