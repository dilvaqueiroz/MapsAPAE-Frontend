import {Entity, Column, PrimaryGeneratedColumn , ManyToOne, JoinColumn} from 'typeorm';
import Usuario from './Usuario';

@Entity('images')
export default class Image{
    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column()
    path:string;

    @ManyToOne(()=> Usuario, usuario => usuario.images)
    @JoinColumn({name:'usuario_id'})
    usuario: Usuario;

}