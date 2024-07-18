import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class InitialUsers1721283932508 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const hashedPassword = await bcrypt.hash('AffinityAdvisors', 10);
    await queryRunner.query(`
            INSERT INTO "users" ("id", "username", "password", "firstName", "lastName", "email", "role", "state", "createdAt") VALUES
            ('1', 'admin', '${hashedPassword}', 'Admin', 'User', 'admin@example.com', 'admin', 'ACTIVE', datetime('now'))
          `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "users"`);
  }
}
