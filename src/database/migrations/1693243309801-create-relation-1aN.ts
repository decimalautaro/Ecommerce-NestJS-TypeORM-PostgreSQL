import { MigrationInterface, QueryRunner } from 'typeorm';

export class createRelation1aN1693243309801 implements MigrationInterface {
  name = 'createRelation1aN1693243309801';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" ADD "brandId" integer`);
    await queryRunner.query(
      `ALTER TABLE "brand" ADD CONSTRAINT "UQ_5f468ae5696f07da025138e38f7" UNIQUE ("name")`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_bb7d3d9dc1fae40293795ae39d6" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_bb7d3d9dc1fae40293795ae39d6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "brand" DROP CONSTRAINT "UQ_5f468ae5696f07da025138e38f7"`,
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "brandId"`);
  }
}
