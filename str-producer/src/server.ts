import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { strProduceMessage } from './producer/str-producer'

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

server.post('/api/send/topic', async (req, res) => {
  
  await strProduceMessage().catch((err) => {
    console.log(err)
    res.status(500).send(false)
  });
  
  res.status(201).send(true)

})