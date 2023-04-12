import producerPayment from '../../kafka/producerPayment'

interface Payment {
  id: number;
  idUser: number;
  idProduct: number;
  cardNumber: string;
}

export class PaymentHandler {

  constructor() { }

  async sendPayment(body: Payment): Promise<Payment> {
    await (await producerPayment()).send({
      topic: 'payment',
      messages: [{
        value: JSON.stringify(body)
      }]
    })

    return body
  }
}