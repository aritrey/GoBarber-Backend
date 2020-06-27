import {MigrationInterface, QueryRunner, Db, Table} from "typeorm";
import { compareAsc } from "date-fns";

export default class CreateAppointments1593092189137 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"appointments",
                columns:[
                  { name: "id",
                   type:"varchar",//uuid
                isPrimary:true,
                generationStrategy:"uuid",
                default:"uuid_generate_v4()"
                },
                {
                    name:"provider",
                    type:"uuid",
                    isNullable:false //das ist eig default
                },
                {
                    name:"date",
                    type: "timestamp with time zone"
                },
                {
                    name:"created_at",
                    type: "timestamp",
                 default:"now()"
                },
                {
                    name:"updated_at",
                    type: "timestamp",
                 default:"now()"
                }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("appointments")
    }

}

// 1) semana: Agendamentos
// 2) semana:user
// 3) semana: Agendamentos edit
// 4) semana compareAsc
// versinskontrolle für Db
// -> alle column eintragungen und änderung hier drin e.b.
