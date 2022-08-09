import { IAppRoutes } from "@/interfaces/IRouter";
import { lazy } from "react";
const Account = lazy(() => import("@/pages/account/account"))
const Login = lazy(() => import("@/pages/auth/login"))
const Register = lazy(() => import("@/pages/auth/register"))
const ResetPassword = lazy(() => import("@/pages/auth/resetPassword"))
const CreatePost = lazy(() => import("@/pages/post/createPost/createPost"))
const AllPosts = lazy(() => import("@/pages/post/allPosts/allPosts"))
const ReadPost = lazy(() => import("@/pages/post/readPost/readPost"))
const EditPost = lazy(() => import('@/pages/post/editPost/editPost'))
const Users = lazy(() => import("@/pages/users/users"))
const User = lazy(() => import("@/pages/user/user"))
const UserPosts = lazy(() => import('@/pages/post/userPosts/userPosts'))

export const postRoutes: IAppRoutes[] = [
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


export const privateRoutes: IAppRoutes[] = [
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
    path: "/user/:userId/posts", component: UserPosts, exact: true
  },
  {
    path: "/users", component: Users, exact: true
  }

]

export const publicRoutes: IAppRoutes[] = [
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