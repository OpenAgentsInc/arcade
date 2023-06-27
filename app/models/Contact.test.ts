import { ContactModel } from "./Contact"

test("can be created", () => {
  const instance = ContactModel.create({ pubkey: "12345", legacy: false, secret: false })

  expect(instance).toBeTruthy()
})
