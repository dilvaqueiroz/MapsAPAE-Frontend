import {Entity, Column, PrimaryGeneratedColumn , ManyToOne, JoinColumn} from 'typeorm';
import Colaborador from './Colaborador';

@Entity('images')
export default class ImageColaborador{
    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column()
    path:string;

    @ManyToOne(()=> Colaborador, colaborador => colaborador.images)
    @JoinColumn({name:'colaborador_id'})
    colaborador: Colaborador;

}