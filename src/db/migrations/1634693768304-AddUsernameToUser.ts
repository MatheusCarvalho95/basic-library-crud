import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUsernameToUser1634693768304 implements MigrationInterface {
    name = 'AddUsernameToUser1634693768304'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`library\`.\`user\` ADD \`username\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`library\`.\`user\` DROP COLUMN \`username\``);
    }

}
