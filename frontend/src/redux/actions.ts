import { alertActions } from "@/redux/reducers/alert/alert.slice";
import { userActions } from "@/redux/reducers/user/user.slice"
import { postActions } from '@/redux/reducers/post/post.slice'

export default {
  ...alertActions,
  ...userActions,
  ...postActions
}