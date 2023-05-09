import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { UserModel } from "./User"
import { api } from "./../services/api"
import { GetUsersResult } from "./../services/api/api.types"

/**
 * Model description here for TypeScript hints.
 */
export const UserStoreModel = types
  .model("UserStore")
  .props({
    users: types.optional(types.array(UserModel), []),
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    async getUsers() {
      const result: GetUsersResult = await api.getUsers()
      if (result.kind === "ok") {
        self.setProp("users", result.users)
      } else {
        console.tron.error(`Error fetching questions: ${JSON.stringify(result)}`, [])
      }
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface UserStore extends Instance<typeof UserStoreModel> {}
export interface UserStoreSnapshotOut extends SnapshotOut<typeof UserStoreModel> {}
export interface UserStoreSnapshotIn extends SnapshotIn<typeof UserStoreModel> {}
export const createUserStoreDefaultModel = () => types.optional(UserStoreModel, {})
