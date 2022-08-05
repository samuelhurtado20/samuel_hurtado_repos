/*
  Warnings:

  - You are about to alter the column `id_repository` on the `Repository` table. The data in that column will be cast from `Int` to `BigInt`. This cast may fail. Please make sure the data in the column can be cast.
  - You are about to alter the column `id_repository` on the `Metric` table. The data in that column will be cast from `Int` to `BigInt`. This cast may fail. Please make sure the data in the column can be cast.

*/
-- RedefineTables
CREATE TABLE "_prisma_new_Repository" (
    "id_repository" INT8 NOT NULL DEFAULT unique_rowid(),
    "name" STRING NOT NULL,
    "state" CHAR(1) NOT NULL,
    "create_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" INT4 NOT NULL,
    "id_tribe" INT8 NOT NULL,

    CONSTRAINT "Repository_pkey" PRIMARY KEY ("id_repository")
);
INSERT INTO "_prisma_new_Repository" ("create_time","id_repository","id_tribe","name","state","status") SELECT "create_time","id_repository","id_tribe","name","state","status" FROM "Repository";
DROP TABLE "Repository" CASCADE;
ALTER TABLE "_prisma_new_Repository" RENAME TO "Repository";
ALTER TABLE "Repository" ADD CONSTRAINT "Repository_id_tribe_fkey" FOREIGN KEY ("id_tribe") REFERENCES "Tribe"("id_tribe") ON DELETE RESTRICT ON UPDATE CASCADE;
CREATE TABLE "_prisma_new_Metric" (
    "id_repository" INT8 NOT NULL,
    "coverage" FLOAT8 NOT NULL,
    "bugs" INT4 NOT NULL,
    "vulnerabilities" INT4 NOT NULL,
    "hotspot" INT4 NOT NULL,
    "code_smells" INT4 NOT NULL,

    CONSTRAINT "Metric_pkey" PRIMARY KEY ("id_repository")
);
DROP INDEX "Metric_id_repository_key";
INSERT INTO "_prisma_new_Metric" ("bugs","code_smells","coverage","hotspot","id_repository","vulnerabilities") SELECT "bugs","code_smells","coverage","hotspot","id_repository","vulnerabilities" FROM "Metric";
DROP TABLE "Metric" CASCADE;
ALTER TABLE "_prisma_new_Metric" RENAME TO "Metric";
CREATE UNIQUE INDEX "Metric_id_repository_key" ON "Metric"("id_repository");
ALTER TABLE "Metric" ADD CONSTRAINT "Metric_id_repository_fkey" FOREIGN KEY ("id_repository") REFERENCES "Repository"("id_repository") ON DELETE RESTRICT ON UPDATE CASCADE;
