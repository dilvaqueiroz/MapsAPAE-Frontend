import {Request, Response} from 'express';
import{getRepository, Like} from 'typeorm';
import doadorView from '../views/doadores_view';
import * as Yup from 'yup';

import  Doador from '../models/Doador';

export default{

    async index(request: Request ,response: Response){
        const doadoresRepository = getRepository(Doador);

        const doadores = await doadoresRepository.find({
            relations:['images']
        });

        return response.json(doadorView.renderMany(doadores));
    },

    async show(request: Request ,response: Response){
        const {id} = request.params;

        const doadoresRepository = getRepository(Doador);

        const doador = await doadoresRepository.findOneOrFail(id, {
            relations:['images']
        });

        return response.json(doadorView.render(doador));
    },

    async search(request: Request ,response: Response){
        const {name} = request.params;

        const doadoresRepository = getRepository(Doador);

        const doador = await doadoresRepository.find({
            relations: ['images'],
            where: `name LIKE '%${name}%'`
        })

        return response.json(doadorView.renderMany(doador));
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
    
        const doadoresRepository = getRepository(Doador);

        
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
    
        const doador = doadoresRepository.create(data);
            
          
    
        await doadoresRepository.save(doador);
    
        return response.status(201).json({doador});
    }
};