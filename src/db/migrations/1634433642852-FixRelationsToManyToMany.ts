import {MigrationInterface, QueryRunner} from "typeorm";

export class FixRelationsToManyToMany1634433642852 implements MigrationInterface {
    name = 'FixRelationsToManyToMany1634433642852'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`author\` DROP FOREIGN KEY \`FK_2629cb97e30d08a66fe6ddd0633\``);
        await queryRunner.query(`CREATE TABLE \`book_author\` (\`bookId\` int NOT NULL, \`authorId\` int NOT NULL, INDEX \`IDX_56b8cdc80ea78d03dcece601ff\` (\`bookId\`), INDEX \`IDX_4979ade189c87f2db1e0e9c213\` (\`authorId\`), PRIMARY KEY (\`bookId\`, \`authorId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`author\` DROP COLUMN \`bookId\``);
        await queryRunner.query(`ALTER TABLE \`book_author\` ADD CONSTRAINT \`FK_56b8cdc80ea78d03dcece601fff\` FOREIGN KEY (\`bookId\`) REFERENCES \`book\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`book_author\` ADD CONSTRAINT \`FK_4979ade189c87f2db1e0e9c213c\` FOREIGN KEY (\`authorId\`) REFERENCES \`author\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book_author\` DROP FOREIGN KEY \`FK_4979ade189c87f2db1e0e9c213c\``);
        await queryRunner.query(`ALTER TABLE \`book_author\` DROP FOREIGN KEY \`FK_56b8cdc80ea78d03dcece601fff\``);
        await queryRunner.query(`ALTER TABLE \`author\` ADD \`bookId\` int NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_4979ade189c87f2db1e0e9c213\` ON \`book_author\``);
        await queryRunner.query(`DROP INDEX \`IDX_56b8cdc80ea78d03dcece601ff\` ON \`book_author\``);
        await queryRunner.query(`DROP TABLE \`book_author\``);
        await queryRunner.query(`ALTER TABLE \`author\` ADD CONSTRAINT \`FK_2629cb97e30d08a66fe6ddd0633\` FOREIGN KEY (\`bookId\`) REFERENCES \`book\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
