import { uuid } from "uuidv4"
import { Entity,Column,PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm"//model das in db gespeichert wird
import User from "./User";
//primary key:PrimaryGeneratedColumn

@Entity("appointments")//die klasse 
class Appointment {
    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column()
    provider_id:string;

    @ManyToOne(()=>User)
    @JoinColumn({name:"provider_id"})
    provider:User//für foreign key 

    @Column("timestamp with time zone")
    date:Date;

    @CreateDateColumn()
    created_at:Date;

    @UpdateDateColumn()
   updated_at:Date;

  
}

export default Appointment