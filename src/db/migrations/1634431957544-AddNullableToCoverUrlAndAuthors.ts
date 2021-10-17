import {MigrationInterface, QueryRunner} from "typeorm";

export class AddNullableToCoverUrlAndAuthors1634431957544 implements MigrationInterface {
    name = 'AddNullableToCoverUrlAndAuthors1634431957544'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book\` CHANGE \`coverUrl\` \`coverUrl\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book\` CHANGE \`coverUrl\` \`coverUrl\` varchar(255) NOT NULL`);
    }

}
