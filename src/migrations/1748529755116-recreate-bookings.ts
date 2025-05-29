import { MigrationInterface, QueryRunner } from "typeorm";

export class RecreateBookings1748529755116 implements MigrationInterface {
    name = 'RecreateBookings1748529755116'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "PK_bee6805982cc1e248e94ce94957"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "customerName"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "customerEmail"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "customerPhone"`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD "bookingId" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "PK_35a5c2c23622676b102ccc3b113" PRIMARY KEY ("bookingId")`);
        await queryRunner.query(`ALTER TYPE "public"."bookings_paymentmethod_enum" RENAME TO "bookings_paymentmethod_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."bookings_paymentmethod_enum" AS ENUM('card', 'cash')`);
        await queryRunner.query(`ALTER TABLE "bookings" ALTER COLUMN "paymentMethod" TYPE "public"."bookings_paymentmethod_enum" USING "paymentMethod"::"text"::"public"."bookings_paymentmethod_enum"`);
        await queryRunner.query(`DROP TYPE "public"."bookings_paymentmethod_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."bookings_paymentmethod_enum_old" AS ENUM('card', 'cash', 'bank_transfer')`);
        await queryRunner.query(`ALTER TABLE "bookings" ALTER COLUMN "paymentMethod" TYPE "public"."bookings_paymentmethod_enum_old" USING "paymentMethod"::"text"::"public"."bookings_paymentmethod_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."bookings_paymentmethod_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."bookings_paymentmethod_enum_old" RENAME TO "bookings_paymentmethod_enum"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "PK_35a5c2c23622676b102ccc3b113"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "bookingId"`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD "customerPhone" character varying`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD "customerEmail" character varying`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD "customerName" character varying`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "PK_bee6805982cc1e248e94ce94957" PRIMARY KEY ("id")`);
    }

}
