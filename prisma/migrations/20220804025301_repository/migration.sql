-- CreateTable
CREATE TABLE "Repository" (
    "id_repository" INT4 NOT NULL DEFAULT unique_rowid(),
    "name" STRING NOT NULL,
    "state" CHAR(1) NOT NULL,
    "create_time" TIMESTAMPTZ(3) NOT NULL,
    "status" INT4 NOT NULL,
    "id_tribe" INT4 NOT NULL,

    CONSTRAINT "Repository_pkey" PRIMARY KEY ("id_repository")
);

-- AddForeignKey
ALTER TABLE "Repository" ADD CONSTRAINT "Repository_id_tribe_fkey" FOREIGN KEY ("id_tribe") REFERENCES "Tribe"("id_tribe") ON DELETE RESTRICT ON UPDATE CASCADE;
