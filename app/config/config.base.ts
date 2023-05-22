export interface ConfigBaseProps {
  persistNavigation: "always" | "dev" | "prod" | "never"
  catchErrors: "always" | "dev" | "prod" | "never"
  exitRoutes: string[],
  AUTH0_DOMAIN: string,
  AUTH0_CLIENT_ID: string
}

export type PersistNavigationConfig = ConfigBaseProps["persistNavigation"]

const BaseConfig: ConfigBaseProps = {
  // This feature is particularly useful in development mode, but
  // can be used in production as well if you prefer.
  persistNavigation: "dev",

  /**
   * Only enable if we're catching errors in the right environment
   */
  catchErrors: "always",

  /**
   * This is a list of all the route names that will exit the app if the back button
   * is pressed while in that screen. Only affects Android.
   */
  exitRoutes: ["Welcome"],
  AUTH0_DOMAIN: "dev-2l7x8x05wpghp2c8.us.auth0.com",
  AUTH0_CLIENT_ID: "O04UKHj2ZpAh8QIK6ta4NdX7AtB4dwZM",
}

export default BaseConfig
