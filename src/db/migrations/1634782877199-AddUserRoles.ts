import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUserRoles1634782877199 implements MigrationInterface {
    name = 'AddUserRoles1634782877199'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`library\`.\`user\` ADD \`role\` enum ('admin', 'user', 'moderator') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`library\`.\`user\` DROP COLUMN \`role\``);
    }

}
