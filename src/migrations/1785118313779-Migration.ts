import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1785118313779 implements MigrationInterface {
    name = 'Migration1785118313779'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`customization\` (\`id\` varchar(36) NOT NULL, \`input_width\` varchar(255) NULL, \`input_height\` varchar(255) NULL, \`input_border\` enum ('dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset', 'none', 'hidden') NOT NULL DEFAULT 'solid', \`input_border_radius\` varchar(255) NULL, \`input_background_color\` varchar(255) NULL, \`button_variant\` enum ('plain', 'primary', 'secondary', 'tertiary', 'monochromePlain') NOT NULL DEFAULT 'primary', \`border_width\` varchar(255) NULL, \`border_color\` varchar(255) NULL, \`button_width\` varchar(255) NULL, \`button_height\` varchar(255) NULL, \`button_border\` enum ('dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset', 'none', 'hidden') NOT NULL DEFAULT 'solid', \`button_background_color\` varchar(255) NULL, \`button_text_color\` varchar(255) NULL, \`direction\` enum ('vertical', 'horizontal') NOT NULL DEFAULT 'horizontal', \`css\` text NULL, \`shop_id\` varchar(255) NOT NULL, UNIQUE INDEX \`REL_7a8672797487c77ac19aab1263\` (\`shop_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`translation\` (\`id\` varchar(36) NOT NULL, \`locale\` varchar(255) NOT NULL, \`translate\` json NOT NULL, \`shop_id\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_9a2b892151bd8f1f7ef8745b6b\` (\`shop_id\`, \`locale\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`shop\` (\`id\` varchar(36) NOT NULL, \`shopify_domain\` varchar(255) NOT NULL, \`shop_owner\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_83c655020eca9aabdd6248be42\` (\`shopify_domain\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`customization\` ADD CONSTRAINT \`FK_7a8672797487c77ac19aab1263e\` FOREIGN KEY (\`shop_id\`) REFERENCES \`shop\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`translation\` ADD CONSTRAINT \`FK_4c68fb1e447c8fc607766064b00\` FOREIGN KEY (\`shop_id\`) REFERENCES \`shop\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`translation\` DROP FOREIGN KEY \`FK_4c68fb1e447c8fc607766064b00\``);
        await queryRunner.query(`ALTER TABLE \`customization\` DROP FOREIGN KEY \`FK_7a8672797487c77ac19aab1263e\``);
        await queryRunner.query(`DROP INDEX \`IDX_83c655020eca9aabdd6248be42\` ON \`shop\``);
        await queryRunner.query(`DROP TABLE \`shop\``);
        await queryRunner.query(`DROP INDEX \`IDX_9a2b892151bd8f1f7ef8745b6b\` ON \`translation\``);
        await queryRunner.query(`DROP TABLE \`translation\``);
        await queryRunner.query(`DROP INDEX \`REL_7a8672797487c77ac19aab1263\` ON \`customization\``);
        await queryRunner.query(`DROP TABLE \`customization\``);
    }

}
