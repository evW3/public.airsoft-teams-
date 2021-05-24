import * as config from "config";
import * as nodemailer from "nodemailer";

import { ISMTP } from "./interfaces";

const smtpData: ISMTP = config.get('smtp');

const url: string = config.get('url');

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: smtpData.email,
        pass: smtpData.password
    }
});

export async function sendSimpleMail(text: string, subject: string, to: string): Promise<void> {
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

export function createHtmlLink(path: string, param: string, paramValue: string, text: string): string {
    return `<a href="${ url }${ path }?${ param }=${ paramValue }">${ text }</a>`;
}
