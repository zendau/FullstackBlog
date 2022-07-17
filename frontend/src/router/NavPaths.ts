interface IPath {
  to: string
  name: string
}

export const publicPaths: IPath[] = [
  {
    to: "/login", name: "Login",
  },
  {
    to: "/register", name: "Register"
  }
]

export const privatePaths: IPath[] = [
  {
    to: "/account", name: "Account"
  },
  {
    to: "/post/all", name: "Posts"
  },
  {
    to: "/post/create", name: "Create post"
  },
  {
    to: "/users", name: "Users"
  }


]