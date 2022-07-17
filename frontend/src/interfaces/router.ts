import React from "react";

export interface INavPaths {
  to: string
  name: string
}


export interface ITypeRoutes {
  path: string
  component: React.FC
  exact: boolean
  child?: ITypeRoutes[]
}