import { MigrationInterface, QueryRunner } from 'typeorm';

export class SecondMigration1759091342670 implements MigrationInterface {
  name = 'SecondMigration1759091342670';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "schedules" DROP CONSTRAINT "PK_7e33fc2ea755a5765e3564e66dd"`,
    );
    await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "schedules" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedules" ADD CONSTRAINT "PK_7e33fc2ea755a5765e3564e66dd" PRIMARY KEY ("id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "schedules" DROP CONSTRAINT "PK_7e33fc2ea755a5765e3564e66dd"`,
    );
    await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "schedules" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "schedules" ADD CONSTRAINT "PK_7e33fc2ea755a5765e3564e66dd" PRIMARY KEY ("id")`,
    );
  }
}
