import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { IMail } from '../interface/mail';
import { logDebug } from '../utilities/winston';

export default class MailSenderService {
    private createTransport(): Mail {
        return nodemailer.createTransport(
            new SMTPTransport({
                host: process.env.SMTP_HOST,
                port: Number(process.env.SMTP_HOST_PORT),
                auth: {
                    user: process.env.SMTP_USERNAME,
                    pass: process.env.SMTP_PASSWORD,
                },
            })
        );
    }

    sendEmail = ({ to, cc, subject, text }: IMail) => {
        const mailOptions = {
            from: `${process.env.SENDER_NAME} <${process.env.SENDER_MAIL}`,
            to,
            cc,
            subject,
            text,
        };
        return this.createTransport().sendMail(mailOptions, (error, info) => {
            if (error) {
                return `Error!: ${error.message}`;
            }
            logDebug(`Mail send to:${mailOptions.to} ${info.response}`);
            return `Complete! ${info.response}`;
        });
    };
}
