import dotenv from 'dotenv'

dotenv.config();

const { API_URL, PORT, KAFKA_BROKERS, KAFKA_CLIENT_ID, KAFKA_TOPIC } = process.env

export default {
  server: {
    port: PORT || '3000',
    KAFKA_BROKERS: KAFKA_BROKERS || 'localhost:9092',
    KAFKA_CLIENT_ID: KAFKA_CLIENT_ID || 'kafka',
    KAFKA_TOPIC: KAFKA_TOPIC || 'payment'
  }
}