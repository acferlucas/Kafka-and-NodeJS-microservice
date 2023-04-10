import express from 'express'
import cors from 'cors'
import morgan from 'morgan';

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
