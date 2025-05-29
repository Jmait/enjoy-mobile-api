import { MigrationInterface, QueryRunner } from "typeorm";

export class RecreateBookings1748528762111 implements MigrationInterface {
    name = 'RecreateBookings1748528762111'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."bookings_driverlanguage_enum" AS ENUM('fr', 'en', 'es')`);
        await queryRunner.query(`CREATE TYPE "public"."bookings_status_enum" AS ENUM('pending', 'confirmed', 'cancelled', 'completed')`);
        await queryRunner.query(`CREATE TYPE "public"."bookings_paymentstatus_enum" AS ENUM('pending', 'paid', 'failed', 'refunded', 'completed')`);
        await queryRunner.query(`CREATE TYPE "public"."bookings_paymentmethod_enum" AS ENUM('card', 'cash', 'bank_transfer')`);
        await queryRunner.query(`CREATE TABLE "bookings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "departureLocation" character varying NOT NULL, "destinationLocation" character varying NOT NULL, "tripDateTime" TIMESTAMP WITH TIME ZONE NOT NULL, "passengers" integer NOT NULL, "bags" integer NOT NULL, "childSeat" integer NOT NULL DEFAULT '0', "pets" integer NOT NULL DEFAULT '0', "wheelchair" integer NOT NULL DEFAULT '0', "boosterSeat" integer NOT NULL DEFAULT '0', "driverLanguage" "public"."bookings_driverlanguage_enum" NOT NULL DEFAULT 'fr', "welcomeSign" boolean NOT NULL DEFAULT false, "flightNumber" character varying, "totalPrice" numeric(10,2) NOT NULL, "languageFee" numeric(10,2) NOT NULL DEFAULT '0', "specificLanguage" boolean NOT NULL DEFAULT false, "welcomeSignFee" numeric(10,2) NOT NULL DEFAULT '0', "status" "public"."bookings_status_enum" NOT NULL DEFAULT 'pending', "paymentStatus" "public"."bookings_paymentstatus_enum" NOT NULL DEFAULT 'pending', "paymentMethod" "public"."bookings_paymentmethod_enum", "customerId" character varying NOT NULL, "customerName" character varying, "customerEmail" character varying, "customerPhone" character varying, "specialInstructions" character varying, "vehicleType" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bee6805982cc1e248e94ce94957" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "bookings"`);
        await queryRunner.query(`DROP TYPE "public"."bookings_paymentmethod_enum"`);
        await queryRunner.query(`DROP TYPE "public"."bookings_paymentstatus_enum"`);
        await queryRunner.query(`DROP TYPE "public"."bookings_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."bookings_driverlanguage_enum"`);
    }

}
