import { Kafka, KafkaMessage, Message } from 'kafkajs'
import config from '../core/config'

export class KafkaSingleton {

  private static kafka: Kafka;

  private constructor() { }

  public static getInstance(): Kafka {
    if (!KafkaSingleton.kafka) {
      KafkaSingleton.kafka = new Kafka({
        clientId: config.server.KAFKA_CLIENT_ID,
        brokers: [config.server.KAFKA_BROKERS]
      })
    }

    return KafkaSingleton.kafka;
  }
}

async function connect() {
  const kafka = KafkaSingleton.getInstance();
  console.log(`Connecting to ${config.server}`)

  const producer = kafka.producer();
  const admin = kafka.admin()

  await producer.connect().catch(err => console.log(err));
  await admin.connect().catch(err => console.log(err));


  return { producer, admin };
};


async function produce(topic: string, messages: Array<Message>) {
  const producer = (await connect()).producer;

  await producer.send({
    topic,
    messages
  }).catch(err => console.log(err));
}

async function adminCreateTopic(topic: string, numPartitions: number) {
  const admin = (await connect()).admin

  await admin.createTopics({
    topics: [
      {
        topic,
        numPartitions
      }
    ]
  }).catch(err => console.log(err))
}

export { connect, produce, adminCreateTopic }