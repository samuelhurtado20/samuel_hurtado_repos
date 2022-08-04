import { Request, Response } from 'express'
import { Organization } from '@prisma/client';
import { Mapper } from "../types/mapper/mapper";
import OrganizationService from '../services/organization.service';
import { OrganizationDTO } from '../types/dtos/organization.dto';
import ResponseDTO from "../types/dtos/response.dto";

const mapper = new Mapper();
const service = new OrganizationService();

export default class OrganizationController {

    public async GetById (req: Request, res: Response) 
    {
        let id = req.params.id;
        try {
            var result = await service.GetById(Number(id))
            
            if (result === null ) res.status(404).json(new ResponseDTO(true, 'Not found', null));

            let dto : OrganizationDTO | null = null;
            mapper.map<Organization | null, OrganizationDTO>(result, dto);

            res.status(200).json(new ResponseDTO(true, '', dto));
        } catch (e) {
            res.status(500).json(new ResponseDTO(false, 'Unexpected error', null));
        }
    }
    
    public async GetAll (_req: Request, res: Response) 
    {
        try {
            var result = await service.GetAll()
            
            let dto : OrganizationDTO[] = Array();
            mapper.map<Organization[], OrganizationDTO[]>(result, dto);

            res.status(200).json(new ResponseDTO(true, '', dto));
        } catch (e) {
            res.status(500).json(new ResponseDTO(false, 'Unexpected error', null));
        }
    }
    
    public async Insert (req: Request, res: Response) 
    {
        try {
            var result = service.Insert(req.body)
            res.status(201).json(result)
        } catch (e) {
            res.status(500).json(new ResponseDTO(false, 'Unexpected error', null));
        }
    }
    
    public async Update (req: Request, res: Response) 
    {
        let id = req.params.id;
        try {
            var result = service.Update(Number(id), req.body)
            res.status(200).json(result)
        } catch (e) {
            res.status(500).json(new ResponseDTO(false, 'Unexpected error', null));
        }
    }
    
    public async Delete (req: Request, res: Response) 
    {
        let id = req.params.id;
        try {
            var result = service.Delete(Number(id))
            res.status(200).json(result)
        } catch (e) {
            res.status(500).json(new ResponseDTO(false, 'Unexpected error', null));
        }
    }
}