import { Request, Response } from 'express'
import OrganizationService from '../services/organization.service';
import { OrganizationDTO } from '../types/dtos/organization.dto';
import ResponseDTO from "../types/dtos/response.dto";
import Utils from '../utils/utils';

const service = new OrganizationService();

export default class OrganizationController 
{
    public async GetById (req: Request, res: Response) 
    {
        let id = req.params.id;
        try {
            var result = await service.GetById(BigInt(id)) 

            if (result === null ) 
            {
                res.status(404).json(new ResponseDTO(true, 'Not found', null));
            }
            else
            {
                const data = new OrganizationDTO(result!).convert();
                res.status(200).json(new ResponseDTO(true, '', Utils.Convert(data)));
            }
        } catch (e) {
            console.log(e)
            res.status(500).json(new ResponseDTO(false, 'Unexpected error', null));
        }
    }
    
    public async GetAll (_req: Request, res: Response) 
    {
        try {
            const result = await service.GetAll();
            const data = Array();
            result.forEach(element => {
                data.push(new OrganizationDTO(element).convert())
            });

            res.status(200).json(new ResponseDTO(true, '', data));
        } catch (e) {
            console.log(e)
            res.status(500).json(new ResponseDTO(false, 'Unexpected error', null));
        }
    }
    
    public async Insert (req: Request, res: Response) 
    {
        try {
            var result = await service.Insert(req.body)
            const resp = Utils.Convert(result)
            res.status(201).json(resp)
        } catch (e) {
            console.log(e)
            res.status(500).json(new ResponseDTO(false, 'Unexpected error', null));
        }
    }
    
    public async Update (req: Request, res: Response) 
    {
        let id = req.params.id;
        try {
            var result = await service.Update(BigInt(id), req.body)
            res.status(200).json(Utils.Convert(result))
        } catch (e) {
            console.log(e)
            res.status(500).json(new ResponseDTO(false, 'Unexpected error', null));
        }
    }
    
    public async Delete (req: Request, res: Response) 
    {
        let id = req.params.id.toString();
        try {
            var result = await service.Delete(BigInt(id))
            res.status(200).json(Utils.Convert(result))
        } catch (e) {
            console.log(e)
            res.status(500).json(new ResponseDTO(false, 'Unexpected error', null));
        }
    }
    
    public async DeleteAll (_req: Request, res: Response) 
    {
        try {
            await service.DeleteAll()
            res.status(200).json(new ResponseDTO(true, 'Deleted', null))
        } catch (e) {
            console.log(e)
            res.status(500).json(new ResponseDTO(false, 'Unexpected error', null));
        }
    }
}