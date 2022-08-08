-- CreateTable
CREATE TABLE "Organization" (
    "id_organization" INT8 NOT NULL DEFAULT unique_rowid(),
    "name" STRING NOT NULL,
    "status" INT4 NOT NULL
);

-- CreateTable
CREATE TABLE "Tribe" (
    "id_tribe" INT8 NOT NULL DEFAULT unique_rowid(),
    "name" STRING NOT NULL,
    "status" INT4 NOT NULL,
    "id_organization" INT8 NOT NULL
);

-- CreateTable
CREATE TABLE "Repository" (
    "id_repository" INT8 NOT NULL DEFAULT unique_rowid(),
    "name" STRING NOT NULL,
    "state" CHAR(1) NOT NULL,
    "create_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" INT4 NOT NULL,
    "id_tribe" INT8 NOT NULL
);

-- CreateTable
CREATE TABLE "Metric" (
    "id_repository" INT8 NOT NULL,
    "coverage" FLOAT8 NOT NULL,
    "bugs" INT4 NOT NULL,
    "vulnerabilities" INT4 NOT NULL,
    "hotspot" INT4 NOT NULL,
    "code_smells" INT4 NOT NULL,

    CONSTRAINT "Metric_pkey" PRIMARY KEY ("id_repository")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organization_id_organization_key" ON "Organization"("id_organization");

-- CreateIndex
CREATE UNIQUE INDEX "Tribe_id_tribe_key" ON "Tribe"("id_tribe");

-- CreateIndex
CREATE UNIQUE INDEX "Repository_id_repository_key" ON "Repository"("id_repository");

-- CreateIndex
CREATE UNIQUE INDEX "Metric_id_repository_key" ON "Metric"("id_repository");

-- AddForeignKey
ALTER TABLE "Tribe" ADD CONSTRAINT "Tribe_id_organization_fkey" FOREIGN KEY ("id_organization") REFERENCES "Organization"("id_organization") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Repository" ADD CONSTRAINT "Repository_id_tribe_fkey" FOREIGN KEY ("id_tribe") REFERENCES "Tribe"("id_tribe") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Metric" ADD CONSTRAINT "Metric_id_repository_fkey" FOREIGN KEY ("id_repository") REFERENCES "Repository"("id_repository") ON DELETE RESTRICT ON UPDATE CASCADE;
