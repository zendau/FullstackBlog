import React from "react";

export interface INavPaths {
  to: string
  name: string
}


export interface IAppRoutes {
  path: string
  component?: React.FC
  exact: boolean
  children?: IAppRoutes[]
}