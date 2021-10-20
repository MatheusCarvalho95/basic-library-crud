import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTableUsersAddDates1634692216402 implements MigrationInterface {
    name = 'CreateTableUsersAddDates1634692216402'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`library\`.\`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`library\`.\`book\` ADD \`description\` longtext NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`library\`.\`book\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`library\`.\`book\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`library\`.\`book\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`library\`.\`book\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`library\`.\`book\` DROP COLUMN \`description\``);
        await queryRunner.query(`DROP TABLE \`library\`.\`user\``);
    }

}
