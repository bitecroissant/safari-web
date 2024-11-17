import { useEffect } from "react"
import { useAjax } from "../lib/ajax"

export const DailyBoard: React.FC = () => {
    const { get } = useAjax()

    const fetchPageData = async () => {
        const result = await get('/event_dates')
        console.log(result)
    }

    useEffect(() => {
        fetchPageData()
    }, [])

    return (
        <>
            <header>bbbbb</header>
        </>
    )
}