import { GeneralApiProblem } from "./apiProblem"

/**
 * These types indicate the shape of the data you expect to receive from your
 * API endpoint, assuming it's a JSON object like we have.
 */
export interface User {
  id: string
  auth_token?: string
  email: string
  created_at: Date | number
  updated_at: Date | number
  first_name: string
  last_name: string
}

export interface Users {
  users: User[],
  kind: "ok"
}

export type GetUsersResult = Users | { kind: "bad-data" } | { kind: "no-data" } | GeneralApiProblem

/**
 * The options used to configure apisauce.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number
}
