import { MigrationInterface, QueryRunner } from "typeorm";

export class RecreateBookings1748547446113 implements MigrationInterface {
    name = 'RecreateBookings1748547446113'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookings" ADD "departureLat" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD "destinationLat" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD "departureLng" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD "destinationLng" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD "distance" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD "time" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "time"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "distance"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "destinationLng"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "departureLng"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "destinationLat"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "departureLat"`);
    }

}
