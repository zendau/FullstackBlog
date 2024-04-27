import type { ComponentOptionsMixin, DefineComponent, PublicProps } from "vue"

export type VueComponent = DefineComponent<
  {},
  {},
  {},
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  {},
  string,
  PublicProps,
  Readonly<globalThis.ExtractPropTypes<{}>>,
  {},
  {}
>
