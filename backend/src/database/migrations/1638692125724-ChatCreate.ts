import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChatCreate1638692125724 implements MigrationInterface {
  name = 'ChatCreate1638692125724';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "room" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying, CONSTRAINT "PK_c6d46db005d623e691b2fbcba23" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "message" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "content" character varying NOT NULL, "seen" boolean NOT NULL DEFAULT false, "sender_id" uuid, "room_id" uuid, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "room_participants_user" ("room_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_018d3e78bb28c0ad4c4ed0f75ef" PRIMARY KEY ("room_id", "user_id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_71d7bbb62b50e9ca77c7d1fd1f" ON "room_participants_user" ("room_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5f42353cf9deff10af19291b2f" ON "room_participants_user" ("user_id") `
    );
    await queryRunner.query(
      `ALTER TABLE "message" ADD CONSTRAINT "FK_c0ab99d9dfc61172871277b52f6" FOREIGN KEY ("sender_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "message" ADD CONSTRAINT "FK_a9edf3bbd4fc17c42ee8677b9ce" FOREIGN KEY ("room_id") REFERENCES "room"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "room_participants_user" ADD CONSTRAINT "FK_71d7bbb62b50e9ca77c7d1fd1f0" FOREIGN KEY ("room_id") REFERENCES "room"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "room_participants_user" ADD CONSTRAINT "FK_5f42353cf9deff10af19291b2ff" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "room_participants_user" DROP CONSTRAINT "FK_5f42353cf9deff10af19291b2ff"`
    );
    await queryRunner.query(
      `ALTER TABLE "room_participants_user" DROP CONSTRAINT "FK_71d7bbb62b50e9ca77c7d1fd1f0"`
    );
    await queryRunner.query(
      `ALTER TABLE "message" DROP CONSTRAINT "FK_a9edf3bbd4fc17c42ee8677b9ce"`
    );
    await queryRunner.query(
      `ALTER TABLE "message" DROP CONSTRAINT "FK_c0ab99d9dfc61172871277b52f6"`
    );
    await queryRunner.query(`DROP INDEX "IDX_5f42353cf9deff10af19291b2f"`);
    await queryRunner.query(`DROP INDEX "IDX_71d7bbb62b50e9ca77c7d1fd1f"`);
    await queryRunner.query(`DROP TABLE "room_participants_user"`);
    await queryRunner.query(`DROP TABLE "message"`);
    await queryRunner.query(`DROP TABLE "room"`);
  }
}
