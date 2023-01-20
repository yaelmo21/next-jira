interface SeedData {
    entries: SeedEntry[];
}


interface SeedEntry {
    description: string;
    status: string;
    createdAt: number;
}


export const seedData: SeedData = {
    entries: [
        {
            description: ' Pendiente: Hola Munndo',
            status: 'pending',
            createdAt: Date.now(),
        },
        {
            description: 'En progreso: Hola Mundo',
            status: 'in-progress',
            createdAt: Date.now() - 100000,
        },
        {
            description: 'Terminada: Hola Mundo',
            status: 'finished',
            createdAt: Date.now() - 100000,
        },
    ]
}