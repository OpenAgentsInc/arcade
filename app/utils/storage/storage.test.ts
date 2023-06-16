import { load, loadString, save, saveString, clear, remove } from "./storage"

delete global.crypto
global.crypto = require('crypto').webcrypto


test("storage: save/load val", async () => {
  await save("some1", { a: 2 })
  const value = await load("some1")
  expect(value).toEqual({ a: 2 })
  await clear()
  expect(await load("some1")).toBe(null)
})

test("storage: save/load str", async () => {
  await saveString("some2", "str")
  const value = await loadString("some2")
  expect(value).toEqual("str")
  await remove("some2")
  expect(await loadString("some2")).toBe(null)
})
