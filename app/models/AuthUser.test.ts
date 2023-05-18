import { AuthUserModel } from "./AuthUser"

test("can be created", () => {
  const instance = AuthUserModel.create({})

  expect(instance).toBeTruthy()
})
