import { MessageModel } from "./Message"

test("can be created", () => {
  const instance = MessageModel.create({})

  expect(instance).toBeTruthy()
})
