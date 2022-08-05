import { ITypeRoutes } from "@/interfaces/IRouter";
import Account from "@/pages/account/account"
import Login from "@/pages/auth/login"
import Register from "@/pages/auth/register"
import ResetPassword from "@/pages/auth/resetPassword"
import CreatePost from "@/pages/post/createPost/createPost";
import AllPosts from "@/pages/post/allPosts";
import ReadPost from "@/pages/post/readPost/readPost";
import EditPost from '@/pages/post/editPost';
import Users from "@/pages/users/users"
import User from "@/pages/user/user"

export const postRoutes: ITypeRoutes[] = [
  {
    path: "/post/create", component: CreatePost, exact: true
  },
  {
    path: "/post/all", component: AllPosts, exact: true
  },
  {
    path: "/post/:id", component: ReadPost, exact: true
  },
  {
    path: "/post/edit/:id", component: EditPost, exact: true
  }
]


export const privateRoutes: ITypeRoutes[] = [
  {
    path: "/account", component: Account, exact: true,
  },
  {
    path: "/post", children: postRoutes, exact: false
  },
  {
    path: "/user/:userId", component: User, exact: true
  },
  {
    path: "/users", component: Users, exact: true
  }

]

export const publicRoutes: ITypeRoutes[] = [
  {
    path: "/login", component: Login, exact: true
  },
  {
    path: "/register", component: Register, exact: true
  },
  {
    path: "/forgot", component: ResetPassword, exact: true
  }
]