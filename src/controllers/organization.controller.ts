import { Organization } from '@prisma/client';
import { Request, Response } from 'express'
import OrganizationService from '../services/organization.service';
import { OrganizationDTO } from '../types/dtos/organization.dto';
import { Mapper } from "../types/mapper/organization.mapper";

const mapper = new Mapper();
const service = new OrganizationService();

export default class OrganizationController {

    public async GetById (req: Request, res: Response) 
    {
        let id = req.params.id;
        try {
            var result = await service.GetById(Number(id))
            
            if (result === null ) res.status(404).json({ message: "Not found" });

            let dto : OrganizationDTO | null = null;
            mapper.map<Organization | null, OrganizationDTO>(result, dto);

            res.status(200).json(dto);
        } catch (e) {
            res.status(500).send({
                message: "Unexpected error"
            })
        }
    }
    
    public async GetAll (_req: Request, res: Response) 
    {
        try {
            var result = await service.GetAll()
            
            let dto : OrganizationDTO[] = Array();
            mapper.map<Organization[], OrganizationDTO[]>(result, dto);

            res.status(200).json(dto)
        } catch (e) {
            res.status(500).send({
                message: "Unexpected error"
            })
        }
    }
    
    public async Insert (req: Request, res: Response) 
    {
        try {
            var result = service.Insert(req.body)
            res.status(201).json(result)
        } catch (e) {
            res.status(500).send({
                message: "Unexpected error"
            })
        }
    }
    
    public async Update (req: Request, res: Response) 
    {
        let id = req.params.id;
        try {
            var result = service.Update(Number(id), req.body)
            res.status(200).json(result)
        } catch (e) {
            res.status(500).send({
                message: "Unexpected error"
            })
        }
    }
    
    public async Delete (req: Request, res: Response) 
    {
        let id = req.params.id;
        try {
            var result = service.Delete(Number(id))
            res.status(200).json(result)
        } catch (e) {
            res.status(500).send({
                message: "Unexpected error"
            })
        }
    }
}