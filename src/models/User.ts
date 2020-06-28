import { uuid } from "uuidv4"
import { Entity,Column,PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn } from "typeorm"//model das in db gespeichert wird
//primary key:PrimaryGeneratedColumn

@Entity("users")//die klasse 
class User {
    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column()
    name:string;
    
    @Column()
    email:string;
    
    @Column()
    password:string;

    @Column()
    avatar:string;


    @CreateDateColumn()
    created_at:Date;

    @UpdateDateColumn()
   updated_at:Date;

  
}

export default User