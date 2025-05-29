import { MigrationInterface, QueryRunner } from "typeorm";

export class RecreateBookings1748529132224 implements MigrationInterface {
    name = 'RecreateBookings1748529132224'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookings" ADD "customerIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_8ce39f3e1331082c10066774112" FOREIGN KEY ("customerIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_8ce39f3e1331082c10066774112"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "customerIdId"`);
    }

}
