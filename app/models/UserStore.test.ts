import { UserStoreModel } from "./UserStore"

test("can be created", () => {
  const instance = UserStoreModel.create({})

  expect(instance).toBeTruthy()
})
