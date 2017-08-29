const helper = require('sendgrid').mail;
const sg = require('sendgrid')(process.env.SENDGRID_KEY);

class EmailComponent {

  constructor() {
    this.orderCreateTemplateId = '';
    this.orderDeliveredTemplateId = '';
    this.emailFrom = '';
  }

  async sendEmail(mail) {
    const request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON(),
    });

    sg.API(request)
      .then((res) => {
        console.log(res);
      }).catch(err =>{
        console.log(err);
      });
  }

  setOrderContent(orderContent, orderCode, orderSecretCode, personName, personEmail, paymentType, emailTemplateId, subject) {
    const jsonContent = JSON.parse(orderContent);

    let orderItens = '<table style="width:60%"><tr><td><b>Produto</b></td><td><b>Quantidade</b></td></tr>';
    jsonContent.order.order_itens.forEach((item) => {
      orderItens += `<tr><td>${item.product_name}</td><td>${item.quantity}</td></tr>`;
    });
    orderItens += '</table>';

    const fromEmail = new helper.Email(this.emailFrom);
    const toEmail = new helper.Email(personEmail);
    const emailContent = new helper.Content('text/html', 'Conteúdo do Pedido');
    const mail = new helper.Mail(fromEmail, subject, toEmail, emailContent);

    mail.personalizations[0].addSubstitution(new helper.Substitution('%person_name%', personName));
    mail.personalizations[0].addSubstitution(new helper.Substitution('%order_code%', orderCode));
    mail.personalizations[0].addSubstitution(new helper.Substitution('%order_secret_code%', orderSecretCode));
    mail.personalizations[0].addSubstitution(new helper.Substitution('%order_itens%', orderItens));
    mail.personalizations[0].addSubstitution(new helper.Substitution('%payment_type%', paymentType));
    mail.setTemplateId(emailTemplateId);

    return mail;
  }

}

export default EmailComponent;
