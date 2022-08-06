-- CreateTable
CREATE TABLE "Organization" (
    "id_organization" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" INTEGER NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id_organization")
);

-- CreateTable
CREATE TABLE "Tribe" (
    "id_tribe" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "id_organization" INTEGER NOT NULL,

    CONSTRAINT "Tribe_pkey" PRIMARY KEY ("id_tribe")
);

-- CreateTable
CREATE TABLE "Repository" (
    "id_repository" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "state" CHAR(1) NOT NULL,
    "create_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" INTEGER NOT NULL,
    "id_tribe" INTEGER NOT NULL,

    CONSTRAINT "Repository_pkey" PRIMARY KEY ("id_repository")
);

-- CreateTable
CREATE TABLE "Metric" (
    "id_repository" INTEGER NOT NULL,
    "coverage" DOUBLE PRECISION NOT NULL,
    "bugs" INTEGER NOT NULL,
    "vulnerabilities" INTEGER NOT NULL,
    "hotspot" INTEGER NOT NULL,
    "code_smells" INTEGER NOT NULL,

    CONSTRAINT "Metric_pkey" PRIMARY KEY ("id_repository")
);

-- CreateIndex
CREATE UNIQUE INDEX "Metric_id_repository_key" ON "Metric"("id_repository");

-- AddForeignKey
ALTER TABLE "Tribe" ADD CONSTRAINT "Tribe_id_organization_fkey" FOREIGN KEY ("id_organization") REFERENCES "Organization"("id_organization") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Repository" ADD CONSTRAINT "Repository_id_tribe_fkey" FOREIGN KEY ("id_tribe") REFERENCES "Tribe"("id_tribe") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Metric" ADD CONSTRAINT "Metric_id_repository_fkey" FOREIGN KEY ("id_repository") REFERENCES "Repository"("id_repository") ON DELETE RESTRICT ON UPDATE CASCADE;
