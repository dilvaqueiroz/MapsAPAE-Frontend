import {Request, Response} from 'express';
import{getRepository} from 'typeorm';
import usuarioView from '../views/usuarios_view';
import * as Yup from 'yup';

import  Usuario from '../models/Usuario';

export default{

    async index(request: Request ,response: Response){
        const usuariosRepository = getRepository(Usuario);

        const usuarios = await usuariosRepository.find({
            relations:['images']
        });

        return response.json(usuarioView.renderMany(usuarios));
    },

    async show(request: Request ,response: Response){
        const {id} = request.params;

        const usuariosRepository = getRepository(Usuario);

        const usuario = await usuariosRepository.findOneOrFail(id, {
            relations:['images']
        });

        return response.json(usuarioView.render(usuario));
    },

    async search(request: Request ,response: Response){
        const {name} = request.params;

        const doadoresRepository = getRepository(Usuario);

        const doador = await doadoresRepository.createQueryBuilder("usuarios")
                                                .where("usuarios.name like :name", { name: `%${name}%` })
                                                .getMany();

        return response.json(usuarioView.renderMany(doador));
    },

    async create(request: Request ,response: Response){
        const {
            name,
            latitude,
            longitude,
            cep,
            street,
            number,
            district,
            about,
            instructions,
            opening_hours,
            open_on_weekends, 
        } = request.body;
    
        const usuariosRepository = getRepository(Usuario);

        
        const requestImages =request.files as Express.Multer.File[];

        const images= requestImages.map(image=>{
            return{path:image.filename}
        })
    
        const data = {
            name,
            latitude,
            longitude,
            cep,
            street,
            number,
            district,
            about,
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends == 'true', 
            images
        };

        const schema =Yup.object().shape({
            name: Yup.string().required('Nome obrigatório'),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            cep: Yup.string().required(),
            street: Yup.string().required(),
            number: Yup.string().required(),
            district: Yup.string().required(),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images:Yup.array(
                Yup.object().shape({
                path:Yup.string().required(),
            })
            )
        });

        await schema.validate(data,{
            abortEarly:false,
        });
    
        const usuario = usuariosRepository.create(data);
            
          
    
        await usuariosRepository.save(usuario);
    
        return response.status(201).json({usuario});
    },

    async change(request: Request ,response: Response){
        // Novo metodo para put (alterar, modificar, editar)
    }

};