interface ISendMailDTO {
  to: {
    name: string;
    email: string;
  };
  subject: string;
  data: unknown;
  path: string;
}

interface IMailProvider {
  sendMail(mailData: ISendMailDTO): Promise<void>;
}

export { IMailProvider, ISendMailDTO };
