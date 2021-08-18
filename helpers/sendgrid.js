require("dotenv").config();
const mailTemplateProvider = require("./MailTemplateProvider/implementations/index");
const sendgrid = require("@sendgrid/mail");

class SendGridProvider {
  client;
  constructor() {
    this.client = sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async sendMail({ to, from, subject, templateData }) {
    try {
      await this.client.send({
        from: {
          name: from?.name,
          email: from?.email,
        },
        to: {
          name: to.name,
          email: to.email,
        },
        subject,
        html: await mailTemplateProvider.parse(templateData),
      });

    } catch (error) {
      if (error) {
        console.log(error.response.body.errors);
      }
    }
  }
}

module.exports = new SendGridProvider();
