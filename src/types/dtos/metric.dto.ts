import { Metric } from "@prisma/client";

export class MetricDTO {
    repositoryId: BigInt;
    coverage : number;
    vulnerabilities : number;
    hotspot : number;
    codeSmells : number;
    bugs : number;

    constructor(data: Metric){
        this.bugs = data.bugs;
        this.codeSmells = data.code_smells;
        this.coverage = data.coverage;
        this.hotspot = data.hotspot;
        this.repositoryId = data.id_repository;
        this.vulnerabilities = data.vulnerabilities;
   }

    public convert(): any {
        return JSON.parse(JSON.stringify(this, (_key, value) =>
            typeof value === 'bigint'
                ? value.toString()
                : value
        ));
    }
}