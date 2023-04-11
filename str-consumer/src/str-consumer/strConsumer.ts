import { Kafka } from 'kafkajs'

/**
 * O mesmo grupo de um topico do kafka fica escrito em uma partition especifica, caso o usuário não especifique qual
 * o propio cluster faz esse gerenciamento.
 * podemos ter N grupos diferentes ligados a partições do kafka.
 * porém um numero limite de de listening de um mesmo grupo para cada topico.
 */
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
        console.log(`message recived by partition ${partition.toString()} ${message.value.toString()}`)
      } catch (err: any) {
        console.log(`Error consuming Message on topic ${topic} and partition ${partition} in offset ${(Number(message.offset) + 1).toString()}`);
        console.log(err.message);
      }
    },
  })
}

export async function runConsumerB(topic: string) {
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
        console.log(`message recived by partition ${partition.toString()} ${message.value.toString()}`)
      } catch (err: any) {
        console.log(`Error consuming Message on topic ${topic} and partition ${partition} in offset ${(Number(message.offset) + 1).toString()}`);
        console.log(err.message);
      }
    },
  })
}