import express from 'express'
import config from './core/config'

import morgan from 'morgan'
import cors from 'cors'
import paymentController from './controller/paymentController'

const server = express();

server.use(cors());
server.use(morgan('dev'));
server.use(express.json());

server.listen(config.server.port, () => {
  console.log('listening on port ' + config.server.port)
})

server.use(paymentController())

server.get('/api/v1/heartbeat', (req, res) => {
  res.status(200).send({
    server: true,
    config,
  })
})

