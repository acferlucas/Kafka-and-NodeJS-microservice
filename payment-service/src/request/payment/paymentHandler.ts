interface Payment {
  id: number;
  idUser: number;
  idProduct: number;
  cardNumber: string;
}

export class PaymentHandler {

  constructor() { }

  async sendPayment(body: Payment): Promise<Payment> {
    return body
  }
}