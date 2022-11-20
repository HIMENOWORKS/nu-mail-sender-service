import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { logDebug } from './utilities/winston';
import MailSenderService from '../src/services/mail.service';
import { IMail } from './interface/mail';

dotenv.config();
const port = process.env.PORT;

const app = express();
app.get('/health', (req: Request, res: Response) => {
    res.send('working!');
    logDebug('check health');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.post('/sendmail', (req: Request, res: Response) => {
    const mail: IMail = req.body;
    console.log(mail);

    const result = new MailSenderService().sendEmail(mail);
    res.send(result);
});

app.listen(port, () => {
    console.log(
        `Running... at http://localhost:${port} | environment: ${process.env.ENVIRONMENT}`
    );
});
