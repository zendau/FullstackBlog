interface IPath {
  to: string;
  name: string;
}

export const sharedPaths: IPath[] = [
  {
    to: "/post/all",
    name: "Posts",
  },
];

export const publicPaths: IPath[] = [
  {
    to: "/login",
    name: "Login",
  },
  {
    to: "/register",
    name: "Register",
  },
  ...sharedPaths,
];

export const privatePaths: IPath[] = [
  {
    to: "/account",
    name: "Account",
  },

  {
    to: "/post/create",
    name: "Create post",
  },
  {
    to: "/users",
    name: "Users",
  },
  ...sharedPaths,
];
