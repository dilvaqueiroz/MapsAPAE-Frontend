import {Entity, Column, PrimaryGeneratedColumn , ManyToOne, JoinColumn} from 'typeorm';
import Doador from './Doador';

@Entity('imagesDoadores')
export default class ImageDoador{
    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column()
    path:string;

    @ManyToOne(()=> Doador, doador => doador.images)
    @JoinColumn({name:'doador_id'})
    doador: Doador;

}