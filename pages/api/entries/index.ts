import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { Entry, IEntry } from '../../../models';


type Data =
    { message: string }
    | IEntry[]
    | IEntry

export default function handle(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getEntries(res);
        case 'POST':
            return createEntry(req, res);

        default:
            return res.status(400).json({ message: 'Endpoint no existe' })
    }
}

const getEntries = async (res: NextApiResponse<Data>) => {
    await db.connect();
    const entries = await Entry.find({}).sort({ createdAt: 'ascending' });
    await db.disconnect();
    res.status(200).json(entries);
}

const createEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { description = '' } = req.body;
    try {
        await db.connect();
        const entry = new Entry({ description, createdAt: Date.now() });
        await entry.save();
        await db.disconnect();
        return res.status(201).json(entry)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error al crear la entrada' })
    }

}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

}