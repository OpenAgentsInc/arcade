import SecureStore from "expo-secure-store"
import { load, loadString, save, saveString, clear, remove } from "./storage"

test("save/load val", async () => {
  await save("some1", {a:2})
  const value = await load("some1")
  expect(value).toEqual({a:2})
  await clear()
  expect(await load("some1")).toBe(null)
})

test("save/load str", async () => {
  await saveString("some2", "str")
  const value = await loadString("some2")
  expect(value).toEqual("str")
  await remove("some2")
  expect(await loadString("some2")).toBe(null)
})

