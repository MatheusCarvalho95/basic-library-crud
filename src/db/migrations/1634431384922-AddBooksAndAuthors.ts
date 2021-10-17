import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBooksAndAuthors1634431384922 implements MigrationInterface {
  name = 'AddBooksAndAuthors1634431384922';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`book\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`coverUrl\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`author\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`bookId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`author\` ADD CONSTRAINT \`FK_2629cb97e30d08a66fe6ddd0633\` FOREIGN KEY (\`bookId\`) REFERENCES \`book\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`author\` DROP FOREIGN KEY \`FK_2629cb97e30d08a66fe6ddd0633\``,
    );
    await queryRunner.query(`DROP TABLE \`author\``);
    await queryRunner.query(`DROP TABLE \`book\``);
  }
}
