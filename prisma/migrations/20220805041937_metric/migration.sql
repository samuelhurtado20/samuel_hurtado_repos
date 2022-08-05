/*
  Warnings:

  - The `create_time` column on the `Repository` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Metrics` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Metrics" DROP CONSTRAINT "Metrics_id_repository_fkey";

-- AlterTable
ALTER TABLE "Repository" DROP COLUMN "create_time";
ALTER TABLE "Repository" ADD COLUMN     "create_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "Metrics";

-- CreateTable
CREATE TABLE "Metric" (
    "id_repository" INT4 NOT NULL,
    "coverage" FLOAT8 NOT NULL,
    "bugs" INT4 NOT NULL,
    "vulnerabilities" INT4 NOT NULL,
    "hotspot" INT4 NOT NULL,
    "code_smells" INT4 NOT NULL,

    CONSTRAINT "Metric_pkey" PRIMARY KEY ("id_repository")
);

-- CreateIndex
CREATE UNIQUE INDEX "Metric_id_repository_key" ON "Metric"("id_repository");

-- AddForeignKey
ALTER TABLE "Metric" ADD CONSTRAINT "Metric_id_repository_fkey" FOREIGN KEY ("id_repository") REFERENCES "Repository"("id_repository") ON DELETE RESTRICT ON UPDATE CASCADE;
