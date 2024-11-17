import React, { useEffect, useState } from 'react'
import s from './ProgressBar.module.scss'

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
      </div>
  )
}
