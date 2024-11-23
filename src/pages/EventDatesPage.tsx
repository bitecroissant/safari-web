import { useEffect, useState } from "react"
import { useAjax } from "../lib/ajax"
import { time } from "../lib/time"
import { EventDatesPageNew } from "./EventDatesNew"
import { toast } from "react-toastify"
import { EventDatesPageItem } from "./EventDatesPageItem"

const today = time()
today.removeTime()

export const EventDatesPage: React.FC = () => {
    const [killing, setKilling] = useState(false)

    const { get, destory } = useAjax()

    const [eventDates, setEventDates] = useState([] as EventDatesTypes[])

    const fetchPageData = async () => {
        const result = (await get<EventDatesTypes[]>('/event_dates')).data
        if (result && result.length > 0) {
            setEventDates(result)
        }
    }

    useEffect(() => {
        fetchPageData()
    }, [])

    const kill = async (id: number) => {
        if (killing) return
        try {
            setKilling(true)
            await destory(`/event_date?id=${id}&kill=true`)
            toast("😶‍🌫️ 删掉了");
            setKilling(false)
            fetchPageData()
        } catch (err) {
            setKilling(false)
        }
    }

    return (
        <>
            <EventDatesPageNew afterPost={fetchPageData}/>
            <ul
                flex flex-col flex-wrap gap-x="[var(--space-l)]"
            >
                {
                    eventDates.length > 0 && eventDates.map(d => {
                        const { id } = d
                        return (<EventDatesPageItem key={id} kill={kill} item={d} />)
                    })
                }
            </ul>
        </>
    )
}