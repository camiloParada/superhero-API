import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1727901090621 implements MigrationInterface {
  name = 'Initial1727901090621';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`adm_roles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`role\` varchar(50) NOT NULL, \`status\` enum ('ACTIVE', 'INACTIVE', 'DELETED') NOT NULL DEFAULT 'ACTIVE', \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`adm_user_has_password\` (\`id\` int NOT NULL AUTO_INCREMENT, \`password\` varchar(255) NOT NULL, \`status\` enum ('ACTIVE', 'INACTIVE', 'DELETED') NOT NULL DEFAULT 'ACTIVE', \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`adm_users\` (\`id\` varchar(36) NOT NULL, \`firstname\` varchar(80) NOT NULL, \`lastname\` varchar(80) NOT NULL, \`email\` varchar(100) NOT NULL, \`status\` enum ('ACTIVE', 'INACTIVE', 'BLOCKED', 'DELETED') NOT NULL DEFAULT 'ACTIVE', \`activation_hash\` varchar(255) NOT NULL, \`expiration_hash\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`roleId\` int NOT NULL, UNIQUE INDEX \`IDX_f06882b56687f750915615ba06\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`adm_user_has_password\` ADD CONSTRAINT \`FK_dcab54a9d8f96e9bd831729f900\` FOREIGN KEY (\`userId\`) REFERENCES \`adm_users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`adm_users\` ADD CONSTRAINT \`FK_a726c85b8e3e6f64360c91a12ee\` FOREIGN KEY (\`roleId\`) REFERENCES \`adm_roles\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`adm_users\` DROP FOREIGN KEY \`FK_a726c85b8e3e6f64360c91a12ee\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`adm_user_has_password\` DROP FOREIGN KEY \`FK_dcab54a9d8f96e9bd831729f900\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_f06882b56687f750915615ba06\` ON \`adm_users\``,
    );
    await queryRunner.query(`DROP TABLE \`adm_users\``);
    await queryRunner.query(`DROP TABLE \`adm_user_has_password\``);
    await queryRunner.query(`DROP TABLE \`adm_roles\``);
  }
}
