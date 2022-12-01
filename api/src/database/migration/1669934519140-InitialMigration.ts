import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1669934519140 implements MigrationInterface {
  name = 'InitialMigration1669934519140';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`url\` (\`id\` int NOT NULL AUTO_INCREMENT, \`hobbitLink\` varchar(256) NOT NULL, \`url\` tinytext NOT NULL, \`clicks\` int NOT NULL DEFAULT '0', \`isActive\` tinyint NOT NULL DEFAULT 1, \`expiresAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`url\``);
  }
}
