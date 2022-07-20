import { combineReducers } from "redux"

import user from "./redusers/user"
import post from "./redusers/post"


export const rootReducer = combineReducers({
  user,
  post
})

export type RootState = ReturnType<typeof rootReducer>

