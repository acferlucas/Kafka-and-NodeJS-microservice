import dotenv from "dotenv"

dotenv.config()

const { PORT, KAFKA_BROKERS, KAFKA_CLIENT_ID } = process.env

export default {
  server: {
    port: PORT || '3333',
    KAFKA_BROKERS: KAFKA_BROKERS || 'localhost:9092',
    KAFKA_CLIENT_ID: KAFKA_CLIENT_ID || 'kafka'

  }
}