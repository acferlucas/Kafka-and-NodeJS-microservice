import express from 'express'
import cors from 'cors'
import morgan from 'morgan';

import { runConsumer } from './str-consumer/strConsumer';
import { z } from 'zod';

const server = express();

server.use(morgan('dev'))
server.use(cors())
server.use(express.json())

server.listen('3000', () => {
  console.log('listening on port 3000');
})

server.get("/heartbeat", (req, res) => {
  res.status(200).send(true)
})

server.post("/consumer/str-consumer/consume", async (req, res) => {

  const postConsumerBody = z.object({
    topic: z.string(),
  })

  const { topic } = postConsumerBody.parse(req.body)

  await runConsumer(topic).catch(err => {
    console.log(err)

    res.status(500).send({ err })
  });

  res.status(200).send(true)
})