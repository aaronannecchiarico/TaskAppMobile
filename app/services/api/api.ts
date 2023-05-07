/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://github.com/infinitered/ignite/blob/master/docs/Backend-API-Integration.md)
 * documentation for more details.
 */
import { ApiResponse, ApisauceInstance, create } from "apisauce"
import Config from "../../config"
import type { ApiConfig } from "./api.types"
import * as Types from "./api.types"
import { getGeneralApiProblem } from "./apiProblem"
import { UserSnapshotOut } from "app/models"


const API_PAGE_SIZE = 50

const convertUser = (raw: any): UserSnapshotOut => {

  return {
    id: raw.id,
    auth_token: raw.auth_token,
    email: raw.email,
    created_at: raw.created_at.toDate(),
    updated_at: raw.updated_at.toDate(),
    first_name: raw.first_name,
    last_name: raw.last_name,
  }
}

/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
}

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class Api {
  apisauce: ApisauceInstance
  config: ApiConfig

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }

  /**
   * Gets a list of trivia questions.
   */
  async getUsers(): Promise<Types.GetUsersResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get("", {
      amount: API_PAGE_SIZE,
    })

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const rawUsers = response.data.results
      const convertedUsers: UserSnapshotOut[] = rawUsers.map(convertUser)
      return { users: convertedUsers, kind: "ok" }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }
}

// Singleton instance of the API for convenience
export const api = new Api()
