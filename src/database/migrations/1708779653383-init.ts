import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1708779653383 implements MigrationInterface {
    name = 'Init1708779653383'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "password" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "passName" text NOT NULL, "encryptedPassword" text NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "password"`);
    }

}
