import 'dotenv/config'

import express, {type Express, type Request, type Response }from 'express';
import cors from 'cors'

import {PrismaClient} from '@prisma/client';
import {PrismaPg} from '@prisma/adapter-pg';

import {Pool} from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({adapter})

const app: Express = express();
const port: number = Number(process.env.PORT);


app.use(cors())
app.use(express.json())

app.get('/api/health', (req: Request, res: Response) => {
    res.json({status: 'OK', message: 'Trello backend is running'});
})

app.get('/api/boards', async (req: Request, res: Response) => {
    try{
        const boards = await prisma.board.findMany({
            include:{
                columns: {
                    include: {
                        tasks: true
                    }
                }
            }
        })
        res.json(boards);
    } catch(error){
        res.status(500).json({error: 'Failed to fetch data'})
    }
})


app.listen(port, () => console.log(`Server listnening at http://localhost:${port}`))