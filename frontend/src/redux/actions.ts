import { alertActions } from "@/redux/reducers/alert/alert.slice";
import { userActions } from "@/redux/reducers/user/user.slice"

export default {
  ...alertActions,
  ...userActions
}