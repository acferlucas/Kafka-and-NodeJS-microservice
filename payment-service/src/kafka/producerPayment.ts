import { Kafka, Partitioners } from 'kafkajs'

export default async function producerPayment() {
  const kafka = new Kafka({
    clientId: 'kafka',
    brokers: ['localhost:9092'],
  })

  const producer = kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner,
    allowAutoTopicCreation: true,
  })

  await producer.connect()

  return producer
}