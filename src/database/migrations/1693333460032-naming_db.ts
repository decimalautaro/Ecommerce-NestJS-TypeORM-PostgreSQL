import {MigrationInterface, QueryRunner} from "typeorm";

export class namingDb1693333460032 implements MigrationInterface {
    name = 'namingDb1693333460032'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_6c687a8fa35b0ae35ce766b56ce"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_904370c093ceea4369659a3c810"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_124456e637cca7a415897dce659"`);
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" text NOT NULL, "price" integer NOT NULL, "stock" integer NOT NULL, "image" character varying NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "brand_id" integer, CONSTRAINT "UQ_4c9fb58de893725258746385e16" UNIQUE ("name"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4fbc36ad745962e5c11001e1a8" ON "products" ("price", "stock") `);
        await queryRunner.query(`CREATE TABLE "products_categories" ("product_id" integer NOT NULL, "category_id" integer NOT NULL, CONSTRAINT "PK_634f5e1b5983772473fe0ec0008" PRIMARY KEY ("product_id", "category_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f2c76a4306a82c696d620f81f0" ON "products_categories" ("product_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_19fe0fe8c2fcf1cbe1a80f639f" ON "products_categories" ("category_id") `);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "createAt"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "brand" DROP COLUMN "createAt"`);
        await queryRunner.query(`ALTER TABLE "brand" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_6c687a8fa35b0ae35ce766b56ce"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "customerId"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "createAt"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "createAt"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "customerId"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "createAt"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "category" ADD "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "category" ADD "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "brand" ADD "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "brand" ADD "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "customer_id" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_d72eb2a5bbff4f2533a5d4caff9" UNIQUE ("customer_id")`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "order" ADD "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "order" ADD "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "order" ADD "customer_id" integer`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "lastname" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_1530a6f15d3c79d1b70be98f2be" FOREIGN KEY ("brand_id") REFERENCES "brand"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_d72eb2a5bbff4f2533a5d4caff9" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_904370c093ceea4369659a3c810" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_cd7812c96209c5bdd48a6b858b0" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products_categories" ADD CONSTRAINT "FK_f2c76a4306a82c696d620f81f08" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "products_categories" ADD CONSTRAINT "FK_19fe0fe8c2fcf1cbe1a80f639f1" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_categories" DROP CONSTRAINT "FK_19fe0fe8c2fcf1cbe1a80f639f1"`);
        await queryRunner.query(`ALTER TABLE "products_categories" DROP CONSTRAINT "FK_f2c76a4306a82c696d620f81f08"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_cd7812c96209c5bdd48a6b858b0"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_904370c093ceea4369659a3c810"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_d72eb2a5bbff4f2533a5d4caff9"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_1530a6f15d3c79d1b70be98f2be"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "update_at"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "create_at"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "lastname"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "customer_id"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "update_at"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "create_at"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "update_at"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "create_at"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_d72eb2a5bbff4f2533a5d4caff9"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "customer_id"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "update_at"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "create_at"`);
        await queryRunner.query(`ALTER TABLE "brand" DROP COLUMN "update_at"`);
        await queryRunner.query(`ALTER TABLE "brand" DROP COLUMN "create_at"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "update_at"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "create_at"`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "lastName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD "customerId" integer`);
        await queryRunner.query(`ALTER TABLE "order" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "order" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "customerId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_6c687a8fa35b0ae35ce766b56ce" UNIQUE ("customerId")`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "brand" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "brand" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "category" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "category" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`DROP INDEX "public"."IDX_19fe0fe8c2fcf1cbe1a80f639f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f2c76a4306a82c696d620f81f0"`);
        await queryRunner.query(`DROP TABLE "products_categories"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4fbc36ad745962e5c11001e1a8"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_124456e637cca7a415897dce659" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_904370c093ceea4369659a3c810" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_6c687a8fa35b0ae35ce766b56ce" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
