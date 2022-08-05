import { Metric, PrismaClient } from '@prisma/client'
import { MetricDTO } from '../types/dtos/metric.dto';
import { State } from '../types/enums/state.enum';
const prisma = new PrismaClient()

export default class MetricService 
{
    public async Filter(id: Number) {
        try {
            const metricsDB = await prisma.metric.findFirst({
                where: {
                    id_repository: Number(id),
                    coverage: {
                        gt: 75
                    }
                }
            })

            return metricsDB;
        } catch (e) {
            throw e
        }
    }

    public async GetById(id: Number) : Promise<Metric | null> 
    {
        try {
            const result = await prisma.metric
                .findUnique({
                    where: {
                        id_repository: Number(id),
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

    public async Update(id: Number, metrics: Metric) {
        try {
            const result = await prisma.metric.update({
                where: { id_repository: Number(id) },
                data: metrics,
            })
            return result
        } catch (e) {
            throw e
        }
    }

    public async Delete(id: Number) {
        try {
            const result = await prisma.metric.delete({
                where: { id_repository: Number(id) }
            })
            return result
        } catch (e) {
            throw e
        }
    }
}