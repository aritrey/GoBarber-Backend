import {MigrationInterface, QueryRunner,TableColumn, TableForeignKey} from "typeorm";

export default class AlterProviderFieldToProvicerId1593168262198 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("appointments","provider")
        await queryRunner.addColumn("appointments",new TableColumn({
            name:"provider_id",
            type:"uuid",
            isNullable:true //falls ein provider /user gelöscht wird
        }))
        await queryRunner.createForeignKey("appointments",new TableForeignKey({
            name:"AppointmentProvider",//fürs löschen
            columnNames:["provider_id"],
            referencedColumnNames:["id"],
            referencedTableName:"users",
            onDelete:"SET NULL",//"RESTRICT"_> user darf nicht gelöscht werden; "CASCADE" -> wenn user löscht, alle appointments mit ihm löschen
            onUpdate:"CASCADE"
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("appointments","AppointmentProvider")
        await queryRunner.dropColumn("appointments","provider_id")
        await queryRunner.addColumn("appointments",new TableColumn({
            name:"provider",
            type:"uuid",
        }))
    }

}
