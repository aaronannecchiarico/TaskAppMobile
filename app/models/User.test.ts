import { UserModel } from "./User"

test("can be created", () => {
  const instance = UserModel.create({
    id: "1",
    auth_token: "auth_token",
    email: "email",
    created_at: new Date(),
    updated_at: new Date(),
    first_name: "first_name",
    last_name: "last_name",
  })

  expect(instance).toBeTruthy()
})
