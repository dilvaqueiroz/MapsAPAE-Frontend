import {Router} from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import UsuariosController from './controllers/UsuarioController';


const routes = Router();
const upload = multer(uploadConfig);

routes.get('/usuarios', UsuariosController.index);
routes.get('/usuarios/:id', UsuariosController.show);
routes.post('/usuarios', upload.array('images'),UsuariosController.create);

export default routes;