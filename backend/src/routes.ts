import {Router} from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import UsuariosController from './controllers/UsuarioController';
import DoadoresController from './controllers/DoardorController';
import ColaboradoresController from './controllers/ColaboradorController';


const routes = Router();
const upload = multer(uploadConfig);

routes.get('/usuarios', UsuariosController.index);
routes.get('/doadores',DoadoresController.index);
routes.get('/colaboradores',ColaboradoresController.index);
routes.get('/usuarios/:id', UsuariosController.show);
routes.get('/doadores/:id',DoadoresController.show);
routes.get('/colaboradores/:id',ColaboradoresController.show);
routes.post('/usuarios', upload.array('images'),UsuariosController.create);
routes.post('/doadores',upload.array('images'),DoadoresController.create);
routes.post('/colaboradores',upload.array('images'),ColaboradoresController.create);

export default routes;