-- CreateTable
CREATE TABLE "Tribe" (
    "id_tribe" INT4 NOT NULL DEFAULT unique_rowid(),
    "name" STRING NOT NULL,
    "status" INT4 NOT NULL,
    "id_organization" INT4 NOT NULL,

    CONSTRAINT "Tribe_pkey" PRIMARY KEY ("id_tribe")
);

-- AddForeignKey
ALTER TABLE "Tribe" ADD CONSTRAINT "Tribe_id_organization_fkey" FOREIGN KEY ("id_organization") REFERENCES "Organization"("id_organization") ON DELETE RESTRICT ON UPDATE CASCADE;
