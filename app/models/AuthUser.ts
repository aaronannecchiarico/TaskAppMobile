import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { withAuth0 } from "./helpers/withAuth0"
/**
 * Model description here for TypeScript hints.
 */
export const AuthUserModel = types
  .model("AuthUser")
  .props({
    user: types.optional(types.frozen(), {}),
    access_token: types.optional(types.string, ""),
    id_token: types.optional(types.string, ""),
    isAuthenticated: types.optional(types.boolean, false),
  })
  .actions(withSetPropAction)
  .actions((self) => ({
    setUser: (user: AuthUserSnapshotIn) => {
      self.setProp("user", user)
    },
    setAccessToken: (accessToken: string) => {
      self.setProp("access_token", accessToken)
    },
    setIdToken: (idToken: string) => {
      self.setProp("id_token", idToken)
    },
    setIsAuthenticated: (isAuthenticated: boolean) => {
      self.setProp("isAuthenticated", isAuthenticated)
    },
  }))
  .views(() => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    login: async () => {
      try {
        console.tron.log("login")
        const auth0 = withAuth0().auth0
        const credentials = await auth0.webAuth.authorize(
          { scope: "openid profile email", prompt: "login" }, // Ignore the cookie (if present) and show the login page
          { ephemeralSession: true },
        )
        const user = await auth0.auth.userInfo({ token: credentials.accessToken })
        self.setAccessToken(credentials.accessToken)
        self.setIdToken(credentials.idToken)
        self.setUser(user)
        self.setIsAuthenticated(true)
      } catch (error) {
        console.tron.reportError(error)
      }
    },
    logout: async () => {
      try {
        console.tron.log("logout")
        const auth0 = withAuth0().auth0
        await auth0.webAuth.clearSession({})
        await auth0.credentialsManager.clearCredentials()
        self.setAccessToken("")
        self.setIdToken("")
        self.setUser({})
        self.setIsAuthenticated(false)
      } catch (error) {
        console.tron.reportError(error)
      }
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface AuthUser extends Instance<typeof AuthUserModel> {}
export interface AuthUserSnapshotOut extends SnapshotOut<typeof AuthUserModel> {}
export interface AuthUserSnapshotIn extends SnapshotIn<typeof AuthUserModel> {}
export const createAuthUserDefaultModel = () => types.optional(AuthUserModel, {})
