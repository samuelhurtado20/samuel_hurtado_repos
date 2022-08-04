import { Request, Response } from 'express'
import organization from '../services/organization.service';

let GetById = async (req: Request, res: Response) => {
    let id = req.params.id;
    try {
        var result = organization.GetById(Number(id))
        res.status(200).json(result)
    } catch (e) {
        res.status(500).send({
            message: "Unexpected error"
        })
    }
}

let GetAll = async (_req: Request, res: Response) => {
    try {
        var result = organization.GetAll()
        res.status(200).json(result)
    } catch (e) {
        res.status(500).send({
            message: "Unexpected error"
        })
    }
}

let Insert = async (req: Request, res: Response) => {
    try {
        var result = organization.Insert(req.body)
        res.status(200).json(result)
    } catch (e) {
        res.status(500).send({
            message: "Unexpected error"
        })
    }
}

let Update = async (req: Request, res: Response) => {
    let id = req.params.id;
    try {
        var result = organization.Update(Number(id), req.body)
        res.status(200).json(result)
    } catch (e) {
        res.status(500).send({
            message: "Unexpected error"
        })
    }
}

let Delete = async (req: Request, res: Response) => {
    let id = req.params.id;
    try {
        var result = organization.Delete(Number(id))
        res.status(200).json(result)
    } catch (e) {
        res.status(500).send({
            message: "Unexpected error"
        })
    }
}

export default {
    Insert,
    GetAll,
    GetById,
    Update,
    Delete
}