import { MigrationInterface, QueryRunner } from 'typeorm';

export class setupLobbiesEventSourcing1613929677099
  implements MigrationInterface {
  name = 'setupLobbiesEventSourcing1613929677099';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "lobbies_events" ("lobbyId" integer NOT NULL, "id" integer NOT NULL, "eventName" character varying NOT NULL, "eventPayload" jsonb NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_a94d049210681a7381bc9abe024" PRIMARY KEY ("lobbyId", "id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "lobbies" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "version" integer NOT NULL, "cache" jsonb NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_93d4e0c6f527286e712d53a8a57" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_40706973921984d1c5efa5b19b" ON "lobbies" ("code") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0570664e5dd18af99839c8d5a7" ON "lobbies" ("updatedAt") `,
    );
    await queryRunner.query(
      `ALTER TABLE "lobbies_events" ADD CONSTRAINT "FK_29ab4d521638cec4d192f30e941" FOREIGN KEY ("lobbyId") REFERENCES "lobbies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lobbies_events" DROP CONSTRAINT "FK_29ab4d521638cec4d192f30e941"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_0570664e5dd18af99839c8d5a7"`);
    await queryRunner.query(`DROP INDEX "IDX_40706973921984d1c5efa5b19b"`);
    await queryRunner.query(`DROP TABLE "lobbies"`);
    await queryRunner.query(`DROP TABLE "lobbies_events"`);
  }
}
