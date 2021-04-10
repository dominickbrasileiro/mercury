import handlebars from 'handlebars';
import {
  createTestAccount,
  createTransport,
  getTestMessageUrl,
  Transporter,
} from 'nodemailer';
import { readFile } from '../../../utils/file-utils';
import { IMailProvider, ISendMailDTO } from '../models/mail-provider-model';

class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  private async connect() {
    const account = await createTestAccount();

    const transporter = createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    this.client = transporter;
  }

  public async sendMail({
    to,
    subject,
    data,
    path,
  }: ISendMailDTO): Promise<void> {
    if (!this.client) {
      await this.connect();
    }

    const templateFileContent = await readFile(path);

    const parseTemplate = handlebars.compile(templateFileContent);

    const mailHTML = parseTemplate(data);

    const message = await this.client.sendMail({
      from: {
        name: 'noreply@mercury.com',
        address: 'noreply@mercury.com',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: mailHTML,
    });

    console.log('✉  E-mail message sent: %s', message.messageId);
    console.log('✉  Preview URL: %s', getTestMessageUrl(message));
  }
}

export { EtherealMailProvider };
