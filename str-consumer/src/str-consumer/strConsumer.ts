import { Kafka } from 'kafkajs'

export async function runConsumer(topic: string) {
  const kafka = new Kafka({
    clientId: 'kafka',
    brokers: ['localhost:9092'],
  })

  const consumer = kafka.consumer({
    groupId: "str-consumer",
  })

  await consumer.connect();

  await consumer.subscribe({
    topic: topic
  })

  await consumer.run({
    autoCommit: false,
    eachMessage: async ({ topic, partition, message }) => {
      try {
        if (!message.value) {
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