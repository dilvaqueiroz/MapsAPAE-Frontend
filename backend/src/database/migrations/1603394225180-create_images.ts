import {MigrationInterface, QueryRunner,Table} from "typeorm";

export class createImages1603394225180 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name:'images',
            columns:[
                {
                    name:'id',
                    type:'integer',
                    unsigned:true,
                    isPrimary:true,
                    isGenerated:true,
                    generationStrategy:'increment',
                  },
                  {
                    name:'path',
                    type:'varchar',
                  },
                  {
                      name:'usuario_id',
                      type:'integer',
                  }
            ],
            foreignKeys:[
                {
                    name:'ImageUsuario',
                    columnNames:['usuario_id'],
                    referencedTableName:'usuarios',
                    referencedColumnNames: ['id'],
                    onUpdate:'CASCADE',
                    onDelete:'CASCADE',
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('images');
    }

}
