import { MessageStoreModel } from "./MessageStore"

test("can be created", () => {
  const instance = MessageStoreModel.create({})

  expect(instance).toBeTruthy()
})
