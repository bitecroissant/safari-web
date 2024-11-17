import { useEffect, useState } from "react"
import { useAjax } from "../lib/ajax"
import { time } from "../lib/time"
import { Icon } from "../components/Icon"
import { EventDatesPageNew } from "./EventDatesNew"
import { toast } from "react-toastify"

const iconNameMapper: Record<string, string> = {
    '瓜': 'gua',
    '陆': 'lu',
    '田': ''
}

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
                mt="[var(--space-xl)]"
                flex flex-col flex-wrap gap-x="[var(--space-l)]"
            >
                {
                    eventDates.length > 0 && eventDates.map(d => {
                        const { id } = d
                        return (<li key={d.id}
                            mt="[var(--space-xl)]" list-none
                            p="[var(--space-s)] [var(--space-m)]" bg="[var(--color-white)]" rounded="[var(--border-radius)]" shadow="[var(--shadow-small)]"
                            flex-1 flex relative justify-center items-center
                        >
                            <div absolute top="-10px" left="-10px">
                                <Icon name={iconNameMapper[(d.group)] || 'gua'} className="text-20px"></Icon>
                            </div>

                            <div absolute top="-10px" right="-12px" p-4px onClick={() => kill(id)} rounded="50%" bg="[var(--color-primary)]" cursor-pointer >
                                <Icon name="error" className="text-14px text-yellow"></Icon>
                            </div>

                            <div flex-1>
                                <span font-bold text="[var(--color-primary-rotate)]">{d.eventName}</span>
                                {time(d.happenAt).notBefore(today.date) ? '还要' : '过了'}
                                <span  font-bold text-18px text="[var(--color-primary)]">{time(d.happenAt).calcNaturalDaysBetween(time())}
                                </span> 天
                            </div>
                            <div text-12px text="[]">{d.happenAt}</div>
                        </li>)
                    })
                }
            </ul>
        </>
    )
}