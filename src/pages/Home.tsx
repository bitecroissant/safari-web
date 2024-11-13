import axios from "axios"
import { useEffect, useState } from "react"

export const Home: React.FC = () => {
    const [x, setX] = useState('')
    useEffect(() => {
        axios.create({
            headers: {
                'Content-Type': 'application/json',
            },
            timeout: 5000,
        })
        axios.get('https://api.muggle.cc/solarTerms/next')
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