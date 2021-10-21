import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeUserIdToUUID1634782177436 implements MigrationInterface {
    name = 'ChangeUserIdToUUID1634782177436'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`library\`.\`user\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`library\`.\`user\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`library\`.\`user\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`library\`.\`user\` ADD \`id\` char(36) NOT NULL PRIMARY KEY`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`library\`.\`user\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`library\`.\`user\` ADD \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`library\`.\`user\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`library\`.\`user\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
    }

}
