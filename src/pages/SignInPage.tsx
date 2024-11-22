import lottie from 'lottie-web'
import animationData from '../assets/lottie/sentry.json'
import { useEffect, useRef, useState } from 'react'


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
    })


    return (
        <>
            <div ref={divRef} w-200px ></div>
            <ul
                mt="[var(--space-xl)]"
                flex flex-col flex-wrap gap-x="[var(--space-l)]"
            >
            </ul>
        </>
    )
}