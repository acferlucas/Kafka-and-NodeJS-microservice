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


 const connect = async () => {
  
  const kafka = KafkaSingleton.getInstance()
  
  const producer = kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner,
    allowAutoTopicCreation: true,
  })
  const consumer = kafka.consumer({ groupId: 'my-group3' })
  
  await producer.connect()
  await consumer.connect()
  
  return { producer, consumer }
}

const produce = async (topic: string, messages: Array<Message>) => {
  const producer = (await connect()).producer
  
  await producer.send({
      topic: topic,
      messages: messages
  })
}

const consume = async ( topic: string ) => {
  const consumer = (await connect()).consumer
  await consumer.subscribe({ topic: topic, fromBeginning: false })

  await consumer.run({
      autoCommit: false,
      eachMessage: async ({ topic, partition, message }) => {
          try {
            if(!message.value) {
             throw new Error("Error reading the message")
            }
            console.log(message.value.toString())
          } catch (err: any) {
             console.log(`Error consuming Message on topic ${topic} and partition ${partition} in offset ${(Number(message.offset) + 1).toString()}`);
             console.log(err.message);
          }
      },
  })
}

export { produce, connect, consume }