import { ChannelStoreModel } from "./ChannelStore"

test("can be created", () => {
  const instance = ChannelStoreModel.create({})

  expect(instance).toBeTruthy()
})
