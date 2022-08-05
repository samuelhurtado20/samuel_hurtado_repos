/*
  Warnings:

  - You are about to alter the column `id_organization` on the `Organization` table. The data in that column will be cast from `Int` to `BigInt`. This cast may fail. Please make sure the data in the column can be cast.
  - You are about to alter the column `id_organization` on the `Tribe` table. The data in that column will be cast from `Int` to `BigInt`. This cast may fail. Please make sure the data in the column can be cast.
  - You are about to alter the column `id_tribe` on the `Tribe` table. The data in that column will be cast from `Int` to `BigInt`. This cast may fail. Please make sure the data in the column can be cast.
  - Changed the type of `id_tribe` on the `Repository` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Repository" DROP CONSTRAINT "Repository_id_tribe_fkey";

-- AlterTable
ALTER TABLE "Repository" DROP COLUMN "id_tribe";
ALTER TABLE "Repository" ADD COLUMN     "id_tribe" INT8 NOT NULL;

-- RedefineTables
CREATE TABLE "_prisma_new_Organization" (
    "id_organization" INT8 NOT NULL DEFAULT unique_rowid(),
    "name" STRING NOT NULL,
    "status" INT4 NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id_organization")
);
INSERT INTO "_prisma_new_Organization" ("id_organization","name","status") SELECT "id_organization","name","status" FROM "Organization";
DROP TABLE "Organization" CASCADE;
ALTER TABLE "_prisma_new_Organization" RENAME TO "Organization";
CREATE TABLE "_prisma_new_Tribe" (
    "id_tribe" INT8 NOT NULL DEFAULT unique_rowid(),
    "name" STRING NOT NULL,
    "status" INT4 NOT NULL,
    "id_organization" INT8 NOT NULL,

    CONSTRAINT "Tribe_pkey" PRIMARY KEY ("id_tribe")
);
INSERT INTO "_prisma_new_Tribe" ("id_organization","id_tribe","name","status") SELECT "id_organization","id_tribe","name","status" FROM "Tribe";
DROP TABLE "Tribe" CASCADE;
ALTER TABLE "_prisma_new_Tribe" RENAME TO "Tribe";
ALTER TABLE "Tribe" ADD CONSTRAINT "Tribe_id_organization_fkey" FOREIGN KEY ("id_organization") REFERENCES "Organization"("id_organization") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Repository" ADD CONSTRAINT "Repository_id_tribe_fkey" FOREIGN KEY ("id_tribe") REFERENCES "Tribe"("id_tribe") ON DELETE RESTRICT ON UPDATE CASCADE;
