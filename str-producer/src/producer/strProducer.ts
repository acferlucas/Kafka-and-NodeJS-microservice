import { produce } from '../kafka'

async function strProduceMessage() {
  await produce('str-producer', [
    {
      key: "2",
      value: JSON.stringify({
          "ordertime": 1497014222380,
          "orderid": 18,
          "itemid": "Item_184",
          "address": {
              "city": "Mountain View",
              "state": "ED",
              "zipcode": 94041
          }
      }),
      headers: { operation: "Insert" }
    }
])

}

async function sendMessage(message: string) {
 await produce('test-topic',[
  {
    value: message,
  }
])
}

export { strProduceMessage, sendMessage }