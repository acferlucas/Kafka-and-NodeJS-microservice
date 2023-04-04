import { Kafka, KafkaMessage, Message, Partitioners } from 'kafkajs'

export class KafkaSingleton {
  private static kafka: Kafka;

  private constructor() {

  }

  public static getInstance(): Kafka {
    if (!KafkaSingleton.kafka) {
        KafkaSingleton.kafka = new Kafka({
            clientId: 'kafka',
            brokers: ['localhost:9092'],
        })
    }

    return KafkaSingleton.kafka;
}
  
}

/**
 * This method provides an connection for kafka singleton instance
 * */
 const connect = async () => {
  
  const kafka = KafkaSingleton.getInstance()
  const producer = kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner
  })
  await producer.connect()
  
  return { producer }
}

/**
* This method provides an producer for kafka singleton instance
* */
const produce = async (topic: string, messages: Array<Message>) => {
  
  const producer = (await connect()).producer
  
  await producer.send({
      topic: topic,
      messages: messages
  })
}

export { produce, connect }