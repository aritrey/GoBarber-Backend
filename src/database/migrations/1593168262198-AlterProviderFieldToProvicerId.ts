import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
} from "typeorm";

export default class AlterProviderFieldToProvicerId1593168262198
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("appointments", "provider");
        await queryRunner.addColumn(
            "appointments",
            new TableColumn({
                name: "provider_id",
                type: "uuid",
                isNullable: true, //in case a user was deleted
            })
        );
        await queryRunner.createForeignKey(
            "appointments",
            new TableForeignKey({
                name: "AppointmentProvider", //for deletion
                columnNames: ["provider_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "SET NULL",
                //other possibilities: "RESTRICT"_> user can not be deleted; "CASCADE" -> if user deleted, all appointments with his id deleted
                onUpdate: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("appointments", "AppointmentProvider");
        await queryRunner.dropColumn("appointments", "provider_id");
        await queryRunner.addColumn(
            "appointments",
            new TableColumn({
                name: "provider",
                type: "uuid",
            })
        );
    }
}
