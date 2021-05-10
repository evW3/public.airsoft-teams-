import config from "config";
import nodemailer from "nodemailer";

import { ISMTP } from "./interfaces";

const smtpData: ISMTP = config.get('smtp');

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: smtpData.email,
        pass: smtpData.password
    }
});

export async function sendSimpleMail(text: string, subject: string, to: string) {
    try {
        await transport.sendMail({
            from: smtpData.email,
            to,
            subject,
            html: text
        });
    } catch (e) {
        console.log('[ERROR] can`t send message: ', e);
    }
}
