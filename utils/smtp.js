const { createTransport } = require('nodemailer');
const config = require('config');

const { login: user, password: pass, host, port, senderInfo } = config.smtp;

class SMTP {
	async #init() {
	    try {
            return createTransport({
                service: 'gmail',
                auth: {
                    type: 'OAuth2', user, pass,
                    clientId: '804167019695-7rih1kt9uul6q7h3i6cvp2e3v6kjhe39.apps.googleusercontent.com',
                    clientSecret: 'lyA1W1p49feOvV0zsW5krQPk',
                    refreshToken: '1//04fOumQx4ZGbQCgYIARAAGAQSNwF-L9IrjIycoY1VPiU4D7RSILKRFjoB2pmbHCuQe30vPnUW_sFMV1VvJxOBK05GKkAkS5AbjBE'
                }
            });
        } catch (e) {
            console.log(`[ERROR] in method init:\n${ e }`);
        }
	}

	async #sendEmail(to, subject, message, from = senderInfo) {
	    try {
            const transporter = await this.#init();
            return await transporter.sendMail({ from, to, subject, html: message });
        } catch (e) {
            console.log(`[ERROR] in method sendEmail:\n${ e }`);
        }
	}

	async sendConfirmLink(to, link) {
	    try {
            await this.#sendEmail(to, 'LuckyLottery | Подтвердите аккаунт!', link);
        } catch (e) {
            console.log(`[ERROR] in method sendConfirmLink:\n${ e }`);
        }
	}

	async sendGeneratedPassword(to, password) {
	    try {
            await this.#sendEmail(to, 'LuckyLottery | Ваш пароль от аккаунта!', `Данные для входа:<br>Почта: <b>${to}</b><br>Пароль: <b>${password}</b>`);
        } catch (e) {
            console.log(`[ERROR] in method sendGeneratedPassword:\n${ e }`);
        }
	}
}

module.exports = new SMTP();

