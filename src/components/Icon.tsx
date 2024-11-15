import c from 'classnames'
import React from 'react'
import s from './Icon.module.scss'

interface Props {
  name: string
  className?: string
  onClick?: (ev: React.MouseEvent) => void
}
export const Icon: React.FC<Props> = ({ name, className, onClick }) => {
  return (
      <svg className={c(className, s.icon)} onClick={onClick}>
        <use xlinkHref={`#${name}`}></use>
      </svg>
  )
}
