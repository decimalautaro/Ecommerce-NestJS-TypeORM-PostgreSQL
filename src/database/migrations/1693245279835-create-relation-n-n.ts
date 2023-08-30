import { MigrationInterface, QueryRunner } from 'typeorm';

export class createRelationNN1693245279835 implements MigrationInterface {
  name = 'createRelationNN1693245279835';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "category_products_product" ("categoryId" integer NOT NULL, "productId" integer NOT NULL, CONSTRAINT "PK_0b4e34a45516284987c6dbe91cd" PRIMARY KEY ("categoryId", "productId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_90d521137ff8c3e927187bcd27" ON "category_products_product" ("categoryId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ee240b247f9f23e5d35854c186" ON "category_products_product" ("productId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "category" ADD CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name")`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_products_product" ADD CONSTRAINT "FK_90d521137ff8c3e927187bcd27d" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_products_product" ADD CONSTRAINT "FK_ee240b247f9f23e5d35854c186b" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "category_products_product" DROP CONSTRAINT "FK_ee240b247f9f23e5d35854c186b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_products_product" DROP CONSTRAINT "FK_90d521137ff8c3e927187bcd27d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "category" DROP CONSTRAINT "UQ_23c05c292c439d77b0de816b500"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ee240b247f9f23e5d35854c186"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_90d521137ff8c3e927187bcd27"`,
    );
    await queryRunner.query(`DROP TABLE "category_products_product"`);
  }
}
