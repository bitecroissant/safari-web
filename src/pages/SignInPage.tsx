import lottie from 'lottie-web'
import animationData from '../assets/lottie/sentry.json'
import { useEffect, useRef, useState } from 'react'
import { Dialog, DialogTitle } from '@mui/material'
import s from './SignInPage.module.scss'


export const SginInPage: React.FC = () => {
    const divRef = useRef<HTMLDivElement>(null)
    const initialized = useRef(false)

    useEffect(() => {
        if (!divRef.current) { return }
        if (initialized.current) { return }
        console.log('run once')
        lottie.loadAnimation({
            container: divRef.current as any, // 动画容器DOM元素
            renderer: 'svg', // 渲染格式
            loop: true, // 循环播放
            autoplay: true, // 自动播放
            animationData: animationData, // 动画JSON数据
        });
        initialized.current = true
    }, [])


    return (
        <>
            <div flex justify-center items-center >
            </div>
            <Dialog open={true} >
                <DialogTitle>
                    <div className={s.title}>
                        <span>口令</span>
                        <div ref={divRef} className={s.lockAnimation}></div>
                    </div>
                </DialogTitle>
            </Dialog>
        </>
    )
}