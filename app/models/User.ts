import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { api } from "./../services/api"
import { GetUserResult } from "./../services/api/api.types"

/**
 * Model description here for TypeScript hints.
 */
export const UserModel = types
  .model("User")
  .props({
    id: types.identifier,
    email: types.string,
    created_at: types.Date,
    updated_at: types.Date,
    first_name: types.string,
    last_name: types.string,
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    async getUser(token) {
      const result: GetUserResult = await api.getUser(token)
      if (result.kind === "ok") {
        self.setProp("id", result.user.id)
        self.setProp("email", result.user.email)
        self.setProp("created_at", result.user.created_at)
        self.setProp("updated_at", result.user.updated_at)
        self.setProp("first_name", result.user.first_name)
        self.setProp("last_name", result.user.last_name)
      } else {
        console.tron.error(`Error fetching user: ${JSON.stringify(result)}`, [])
      }
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface User extends Instance<typeof UserModel> {}
export interface UserSnapshotOut extends SnapshotOut<typeof UserModel> {}
export interface UserSnapshotIn extends SnapshotIn<typeof UserModel> {}
export const createUserDefaultModel = () => types.optional(UserModel, {})
