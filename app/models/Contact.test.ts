import { ContactModel } from "./Contact"

test("can be created", () => {
  const instance = ContactModel.create({})

  expect(instance).toBeTruthy()
})
