import { MigrationInterface, QueryRunner } from "typeorm";

export class OneMigration1759088291958 implements MigrationInterface {
    name = 'OneMigration1759088291958'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_1c2f5e637713a429f4854024a76"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "filmId"`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD "filmId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "films" DROP CONSTRAINT "PK_697487ada088902377482c970d1"`);
        await queryRunner.query(`ALTER TABLE "films" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "films" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "films" ADD CONSTRAINT "PK_697487ada088902377482c970d1" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_1c2f5e637713a429f4854024a76" FOREIGN KEY ("filmId") REFERENCES "films"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_1c2f5e637713a429f4854024a76"`);
        await queryRunner.query(`ALTER TABLE "films" DROP CONSTRAINT "PK_697487ada088902377482c970d1"`);
        await queryRunner.query(`ALTER TABLE "films" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "films" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "films" ADD CONSTRAINT "PK_697487ada088902377482c970d1" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "filmId"`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD "filmId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_1c2f5e637713a429f4854024a76" FOREIGN KEY ("filmId") REFERENCES "films"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
