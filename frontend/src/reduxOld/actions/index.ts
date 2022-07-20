import * as UserActionCreators from './UserActions'
import * as PostActionCreators from "./PostAction"

export default {
  ...UserActionCreators,
  ...PostActionCreators
}