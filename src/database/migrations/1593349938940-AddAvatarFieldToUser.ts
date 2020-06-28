import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export default class AddAvatarFieldToUser1593349938940 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("users",new TableColumn({
            name:"avatar",
            type:"varchar",//never store the image in a db even if it is base 240, only caminho:) meist in content delivering network
            isNullable:true,//ATTENTION: immer wenn ich schon user haen und colums hinzufüge muss isNullable true sein

    }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users","avatar")
    }

}
