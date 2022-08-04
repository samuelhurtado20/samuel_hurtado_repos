-- CreateTable
CREATE TABLE "Organization" (
    "id_organization" INT4 NOT NULL DEFAULT unique_rowid(),
    "name" STRING NOT NULL,
    "status" INT4 NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id_organization")
);
