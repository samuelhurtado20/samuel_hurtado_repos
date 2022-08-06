import { Metric, PrismaClient } from '@prisma/client'
import { MetricDTO } from '../types/dtos/metric.dto';
import { State } from '../types/enums/state.enum';
const prisma = new PrismaClient()

export default class MetricService 
{
    public async Filter(id: number) {
        try {
            const sql = 'SELECT ' +
            'r.id_repository id, r.name, t.name tribe, o.name organization, ' +
            'm.coverage, m.code_smells, m.bugs, m.vulnerabilities, m.hotspot, r.state, ' +
            'o.id_organization, o.status, t.id_tribe ' +
            'FROM public."Organization" o ' +
            'join public."Tribe" t on o.id_organization = t.id_organization ' +
            'join public."Repository" r on t.id_tribe = r.id_tribe ' +
            'join public."Metric" m on r.id_repository = m.id_repository';
            const result = await prisma.$queryRawUnsafe(sql, id)
            console.log(result)
            return result;
        } catch (e) {
            throw e
        }
    }
    
    // public async Filter(id: number) {
    //     try {
    //         const metricsDB = await prisma.metric.findFirst({
    //             where: {
    //                 id_repository: number(id),
    //                 coverage: {
    //                     gt: 75
    //                 }
    //             }
    //         })

    //         return metricsDB;
    //     } catch (e) {
    //         throw e
    //     }
    // }

    public async GetById(id: number) : Promise<Metric | null> 
    {
        try {
            const result = await prisma.metric
                .findUnique({
                    where: {
                        id_repository: id,
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

    public async Update(id: number, metrics: Metric) {
        try {
            const result = await prisma.metric.update({
                where: { id_repository: id },
                data: metrics,
            })
            return result
        } catch (e) {
            throw e
        }
    }

    public async Delete(id: number) {
        try {
            const result = await prisma.metric.delete({
                where: { id_repository: id }
            })
            return result
        } catch (e) {
            throw e
        }
    }
}