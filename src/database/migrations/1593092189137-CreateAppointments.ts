import { MigrationInterface, QueryRunner, Db, Table } from "typeorm";

export default class CreateAppointments1593092189137
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "appointments",
                columns: [
                    {
                        name: "id",
                        type: "varchar", //uuid
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "provider",
                        type: "uuid",
                        isNullable: false, //(default!)
                    },
                    {
                        name: "date",
                        type: "timestamp with time zone",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("appointments");
    }
}
