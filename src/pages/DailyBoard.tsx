import { useEffect, useState } from "react"
import { useAjax } from "../lib/ajax"
import { time } from "../lib/time"
import { ProgressBar } from "../components/ProgressBar"
import { EventDatesPageItem } from "./EventDatesPageItem"

const today = time()
today.removeTime()

export const DailyBoard: React.FC = () => {
    const { get } = useAjax()

    const [eventDates, setEventDates] = useState([] as EventDatesTypes[])

    const fetchPageData = async () => {
        const result = (await get<EventDatesTypes[]>('/event_dates')).data
        if (result && result.length > 0) {
            const filtered = result.filter(d => {
                return d.isDeleted === 0 && d.group !== 'solar_term'
            })
            setEventDates(filtered)
        }
    }

    useEffect(() => {
        fetchPageData()
    }, [])

    return (
        <>
            <ProgressBar percentage={(time().dayOfYear / time().currentYearDaysCount) * 100} />
            <ul
                flex flex-col flex-wrap gap-x="[var(--space-l)]"
            >
                {
                    eventDates.length > 0 && eventDates.map(d => {
                        const { id } = d
                        return (<EventDatesPageItem key={id} item={d} />)
                    })
                }
            </ul>
        </>
    )
}