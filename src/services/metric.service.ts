import { Metric, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default class MetricService 
{
    public async Filter(id: bigint) {
        try {
            const coverage = process.env.COVERAGE;
            const sql = 'SELECT ' +
            'r.id_repository id, r.name, t.name tribe, o.name organization, ' +
            'm.coverage, m.code_smells, m.bugs, m.vulnerabilities, m.hotspot, r.state, ' +
            'o.id_organization, o.status, t.id_tribe ' +
            'FROM public."Organization" o ' +
            'join public."Tribe" t on o.id_organization = t.id_organization ' +
            'join public."Repository" r on t.id_tribe = r.id_tribe ' +
            'join public."Metric" m on r.id_repository = m.id_repository where m.coverage > $1 and t.id_tribe = $2';
            const result : [] = await prisma.$queryRawUnsafe(sql, Number(coverage), id)
            
            return result;
        } catch (e) {
            console.log(e)
            throw e
        }
    }

    public async GetById(id: bigint) : Promise<Metric | null> 
    {
        try {
            const result = await prisma.metric
                .findUnique({
                    where: {
                        id_repository: BigInt(id),
                    },
                })

            return result;
        } catch (e) {
            throw e
        }
    }

    public async GetAll() 
    {
        try {
            const result = await prisma.metric
                .findMany()

            return result;
        } catch (e) {
            throw e
        }
    }

    public async Insert(metrics: Metric) {
        try {
            const result = await prisma.metric.create({
                data: metrics,
            })
            return result
        } catch (e) {
            throw e
        }
    }

    public async Update(id: bigint, metrics: Metric) {
        try {
            const result = await prisma.metric.update({
                where: { id_repository: BigInt(id) },
                data: metrics,
            })
            return result
        } catch (e) {
            throw e
        }
    }

    public async Delete(id: bigint) {
        try {
            const result = await prisma.metric.delete({
                where: { id_repository: BigInt(id) }
            })
            return result
        } catch (e) {
            throw e
        }
    }
}