import React, { useEffect, useState } from 'react'
import s from './ProgressBar.module.scss'
import { time } from '../lib/time'

interface Props {
  percentage: number
  onClick?: (ev: React.MouseEvent) => void
}
export const ProgressBar: React.FC<Props> = ({ percentage = 0 }) => {
  const [innerPercentage, setInnerPercentage] = useState(0)
  useEffect(() => {
    setTimeout(() => {
        setInnerPercentage(percentage)
    }, 800)
  }, [])

  return (
      <div className={s.progressBar}>
        <div className={s.actualBar} style={{ width: `${innerPercentage}%` }}></div>
        <div className={s.dot} style={{ left: innerPercentage === 0 ? 0 : `calc(${innerPercentage}% - 14px)` }}></div>
        <h5 absolute top='0' style={{ left: innerPercentage > 50 ? '10px' : 'calc(100% - 60px)' }} text="[var(--color-tertiary)]">{ time().year }</h5>
      </div>
  )
}
