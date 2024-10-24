import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCreatedAtToPost1729763130158 implements MigrationInterface {
    name = 'AddCreatedAtToPost1729763130158'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "created_at"`);
    }

}
