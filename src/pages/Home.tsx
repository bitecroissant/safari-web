import axios from "axios"
import { useEffect, useState } from "react"

export const Home: React.FC = () => {
    const [x, setX] = useState('')
    useEffect(() => {
        const axiosInstance = axios.create({
            baseURL: isDev ? 'http://127.0.0.1:8787' : 'https://api.muggle.cc',
            headers: {
                'Content-Type': 'application/json',
            },
            timeout: 5000,
        })
        axiosInstance.get('/solarTerms/next')
            .then((xxx) => {
                setX(JSON.stringify(xxx))
            })
    }, [])
    return (
        <div>
            <header>home</header>
            <p>{x}</p>
        </div>
    )
}