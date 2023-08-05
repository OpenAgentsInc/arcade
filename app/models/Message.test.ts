import { MessageModel } from "./Message"

test("can be created", () => {
  const instance = MessageModel.create({
    id: "12345",
    pubkey: "pubkey",
    content: "test",
    sig: "1234",
  })

  expect(instance).toBeTruthy()
})
