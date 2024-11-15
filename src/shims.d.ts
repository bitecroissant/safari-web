import * as React from 'react'

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    flex?: boolean
    grid?: boolean
    block?: boolean
    fixed?: boolean
    relative?: boolean
    absolute?: boolean
    truncate?: boolean
    shadow?: boolean | string
    'focus:shadow'?: boolean
    w?: string
    h?: string
    b?: string
    p?: string
    z?: string
    bg?: string
    mt?: string
    mr?: string
    mb?: string
    ml?: string
    to?: string
    from?: string
    top?: string
    right?: string
    bottom?: string
    left?: string
    text?: string
    after?: string
    before?: string
    outline?: string
    rounded?: string
  }
  interface SVGProps<T> extends SVGAttributes<T>, ClassAttributes<T> {
    w?: string
    h?: string
  }
}