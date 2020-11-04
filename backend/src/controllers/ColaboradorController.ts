import {Request, Response} from 'express';
import{getRepository} from 'typeorm';
import colaboradorView from '../views/colaboradores_view';
import * as Yup from 'yup';

import  Colaborador from '../models/Colaborador';

export default{

    async index(request: Request ,response: Response){
        const colaboradoresRepository = getRepository(Colaborador);

        const colaboradores = await colaboradoresRepository.find({
            relations:['images']
        });

        return response.json(colaboradorView.renderMany(colaboradores));
    },

    async show(request: Request ,response: Response){
        const {id} = request.params;

        const colaboradoresRepository = getRepository(Colaborador);

        const colaborador = await colaboradoresRepository.findOneOrFail(id, {
            relations:['images']
        });

        return response.json(colaboradorView.render(colaborador));
    },

    async search(request: Request ,response: Response){
        const {name} = request.params;

        const doadoresRepository = getRepository(Colaborador);

        const doador = await doadoresRepository.createQueryBuilder("colaboradores")
                                                .where("colaboradores.name like :name", { name: `%${name}%` })
                                                .getMany();

        return response.json(colaboradorView.renderMany(doador));
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
            opening_hours,
            open_on_weekends, 
        } = request.body;
    
        const colaboradoresRepository = getRepository(Colaborador);

        
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
    
        const colaborador = colaboradoresRepository.create(data);
            
          
    
        await colaboradoresRepository.save(colaborador);
    
        return response.status(201).json({colaborador});
    },

    async change(request: Request ,response: Response){
        // Novo metodo para put (alterar, modificar, editar)
    }
};