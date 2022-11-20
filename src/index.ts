import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { logDebug } from './utilities/winston';

dotenv.config();
const port = process.env.PORT;

const app = express();
app.get('/health', (req: Request, res: Response) => {
    res.send('working!');
    logDebug("check health");
});

app.listen(port, () => {
    console.log(`Running... at http://localhost:${port} | environment: ${process.env.ENVIRONMENT}`);
});
