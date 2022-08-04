-- CreateTable
CREATE TABLE "Metrics" (
    "id_repository" INT4 NOT NULL,
    "coverage" FLOAT8 NOT NULL,
    "bugs" INT4 NOT NULL,
    "vulnerabilities" INT4 NOT NULL,
    "hotspot" INT4 NOT NULL,
    "code_smells" INT4 NOT NULL,

    CONSTRAINT "Metrics_pkey" PRIMARY KEY ("id_repository")
);

-- CreateIndex
CREATE UNIQUE INDEX "Metrics_id_repository_key" ON "Metrics"("id_repository");

-- AddForeignKey
ALTER TABLE "Metrics" ADD CONSTRAINT "Metrics_id_repository_fkey" FOREIGN KEY ("id_repository") REFERENCES "Repository"("id_repository") ON DELETE RESTRICT ON UPDATE CASCADE;
