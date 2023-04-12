import Router from 'express'
import { PaymentHandler } from '../request/payment'
import { z } from 'zod'

const router = Router();

export default () => {

  router.post('/api/v1/payment', async (req, res) => {

    const postPaymentBody = z.object({
      id: z.number(),
      idUser: z.number(),
      idProduct: z.number(),
      cardNumber: z.string(),
    });

    try {
      const body = postPaymentBody.parse(req.body)

      const payment = await new PaymentHandler().sendPayment(body);

      res.status(201).send(payment)
    } catch (err) {

      res.status(400).send(err)
    }
  })

  return router;
}