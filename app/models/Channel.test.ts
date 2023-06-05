import { ChannelModel } from "./Channel"

test("can be created", () => {
  const instance = ChannelModel.create({})

  expect(instance).toBeTruthy()
})
