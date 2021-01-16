import { MigrationInterface, QueryRunner } from 'typeorm';

export class createLobbyTable1609352066568 implements MigrationInterface {
  name = 'createLobbyTable1609352066568';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "lobbies" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_93d4e0c6f527286e712d53a8a57" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_40706973921984d1c5efa5b19b" ON "lobbies" ("code") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_40706973921984d1c5efa5b19b"`);
    await queryRunner.query(`DROP TABLE "lobbies"`);
  }
}
