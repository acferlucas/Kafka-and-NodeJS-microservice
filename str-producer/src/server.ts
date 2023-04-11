import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import { strProduceMessage, produceMessage } from './producer/strProducer'
import { z } from 'zod'

import config from './core/config'

const server = express();

server.use(morgan('dev'))
server.use(cors())
server.use(express.json())

server.listen(config.server.port, () => {
  console.log(`listening on port: ${config.server.port}`);
})

server.get('/api', ( req, res ) => {
  res.send({
    api: 'ok',
    config: config
  })
})

server.post('/api/send/str-topic', async (req, res) => {
  
  await strProduceMessage().catch((err) => {
    console.log(err)
    res.status(500).send(false)
  });
  
  res.status(201).send(true)

})

server.post('/api/send/message', async (req, res) => {
  const sendMessageBody = z.object({
    topic: z.string(),
    message: z.string(),
  })

  const {  topic ,message } = sendMessageBody.parse(req.body);

  await produceMessage(topic, message).catch((err) => {
    console.log(err)

    res.status(500).send(false)
  });

  res.status(201).send(true)

})