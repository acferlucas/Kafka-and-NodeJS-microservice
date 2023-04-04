import { produce } from '../kafka'

async function strProduceMessage() {
  
  await produce('str-producer', [
    {
      key: "1",
      value: JSON.stringify({
          "ordertime": 1497014222380,
          "orderid": 18,
          "itemid": "Item_184",
          "address": {
              "city": "Mountain View",
              "state": "CA",
              "zipcode": 94041
          }
      }),
      headers: { operation: "Insert" }
    }
])

}

export { strProduceMessage }