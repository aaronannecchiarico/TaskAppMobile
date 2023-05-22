import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
/**
 * Model description here for TypeScript hints.
 */
export const AuthUserModel = types
  .model("AuthUser")
  .props({
    user: types.optional(types.frozen(), {}),
    access_token: types.optional(types.string, ""),
    id_token: types.optional(types.string, ""),
  })
  .actions(withSetPropAction)
  .views((self) => ({
    get isLoggedIn() {
      return !!self.access_token
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    saveUser: (user: AuthUserSnapshotIn) => {
      self.setProp("user", user)
    },
    saveAccessToken: (accessToken: string) => {
      self.setProp("access_token", accessToken)
    },
    saveIdToken: (idToken: string) => {
      self.setProp("id_token", idToken)
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface AuthUser extends Instance<typeof AuthUserModel> {}
export interface AuthUserSnapshotOut extends SnapshotOut<typeof AuthUserModel> {}
export interface AuthUserSnapshotIn extends SnapshotIn<typeof AuthUserModel> {}
export const createAuthUserDefaultModel = () => types.optional(AuthUserModel, {})
