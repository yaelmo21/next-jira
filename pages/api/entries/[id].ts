import type { NextApiRequest, NextApiResponse } from 'next'
import { Entry, IEntry } from '../../../models';
import mongoose from 'mongoose';
import { db } from '../../../database';

type Data =
    { message: string }
    | IEntry[]
    | IEntry

export default function Handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { id } = req.query;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'Id no valido' });
    switch (req.method) {
        case 'PUT':
            return updateEntry(req, res);
        case 'GET':
            return getEntry(req, res);
        default:
            return res.status(400).json({ message: 'Endpoint no existe' })
    }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query;
    await db.connect();
    const entryToUpdate = await Entry.findById(id);
    if (!entryToUpdate) {
        await db.disconnect();
        return res.status(404).json({ message: 'Entrada no encontrada' });
    }
    const { description = entryToUpdate.description, status = entryToUpdate.status } = req.body;
    try {
        const updatedEntry = await Entry.findByIdAndUpdate(id, { description, status }, { new: true, runValidators: true });
        await db.disconnect();
        res.status(200).json(updatedEntry!);
    } catch (error: any) {
        await db.disconnect();
        return res.status(400).json({ message: error.errors.status.message })
    }
}

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query;
    await db.connect();
    const entry = await Entry.findById(id);
    await db.disconnect();
    if (!entry) return res.status(404).json({ message: 'Entrada no encontrada' });
    res.status(200).json(entry);
}