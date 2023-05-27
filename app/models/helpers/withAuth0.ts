import Auth0 from "react-native-auth0"
import Config from "app/config"
export const withAuth0 = () => {
  const auth0 = new Auth0({
    domain: Config.AUTH0_DOMAIN,
    clientId: Config.AUTH0_CLIENT_ID,
  })
  const { authorize, clearSession } = auth0.webAuth

  const { getCredentials, clearCredentials, requireLocalAuthentication } = auth0.credentialsManager

  return {
    authorize,
    clearSession,
    getCredentials,
    clearCredentials,
    requireLocalAuthentication,
    auth0,
  }
}
