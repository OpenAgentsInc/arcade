import { ChannelModel } from "./Channel"

test("can be created", () => {
  const instance = ChannelModel.create({ id: "12345" })

  expect(instance).toBeTruthy()
})
