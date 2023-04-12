import { produce } from '../../kafka'
import config from '../../core/config'

interface Payment {
  id: number;
  idUser: number;
  idProduct: number;
  cardNumber: string;
}

export class PaymentHandler {

  constructor() { }

  async sendPayment(body: Payment): Promise<Payment> {

    await produce(config.server.KAFKA_TOPIC, [
      {
        headers: { operation: "created" },
        value: JSON.stringify(body)
      }
    ]);

    return body
  }
}