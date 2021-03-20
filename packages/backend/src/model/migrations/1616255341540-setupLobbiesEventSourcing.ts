import { MigrationInterface, QueryRunner } from 'typeorm';

export class setupLobbiesEventSourcing1616255341540
  implements MigrationInterface {
  name = 'setupLobbiesEventSourcing1616255341540';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "lobbies_events" ("lobbyId" character varying NOT NULL, "id" integer NOT NULL, "eventName" character varying NOT NULL, "eventPayload" jsonb NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_a94d049210681a7381bc9abe024" PRIMARY KEY ("lobbyId", "id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "lobbies" ("id" character varying NOT NULL, "version" integer NOT NULL, "cache" jsonb NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_93d4e0c6f527286e712d53a8a57" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "Index_updatedAt" ON "lobbies" ("updatedAt") `,
    );
    await queryRunner.query(
      `ALTER TABLE "lobbies_events" ADD CONSTRAINT "FK_29ab4d521638cec4d192f30e941" FOREIGN KEY ("lobbyId") REFERENCES "lobbies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lobbies_events" DROP CONSTRAINT "FK_29ab4d521638cec4d192f30e941"`,
    );
    await queryRunner.query(`DROP INDEX "Index_updatedAt"`);
    await queryRunner.query(`DROP TABLE "lobbies"`);
    await queryRunner.query(`DROP TABLE "lobbies_events"`);
  }
}
