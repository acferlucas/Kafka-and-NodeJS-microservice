import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { strProduceMessage, sendMessage } from './producer/strProducer'
import { consume } from './kafka/index'
import { z } from 'zod'

const server = express();

server.use(morgan('dev'))
server.use(cors())
server.use(express.json())

server.listen('3333', () => {
  console.log('listening on port: 3333');
})

server.get('/api', ( req, res ) => {
  res.send(true)
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
    message: z.string(),
  })

  const { message } = sendMessageBody.parse(req.body);

  await sendMessage(message).catch((err) => {
    console.log(err)

    res.status(500).send(false)
  });

  res.status(201).send(true)

})