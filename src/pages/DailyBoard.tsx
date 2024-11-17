import { useEffect, useState } from "react"
import { useAjax } from "../lib/ajax"
import { time } from "../lib/time"
import { ProgressBar } from "../components/ProgressBar"
import { Icon } from "../components/Icon"

const iconNameMapper: Record<string, string> = {
    '瓜': 'gua',
    '陆': 'lu',
    '田': ''
}

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
            console.log(filtered)
        }
    }

    useEffect(() => {
        fetchPageData()
    }, [])



    return (
        <>
            <ProgressBar percentage={(time().dayOfYear / time().currentYearDaysCount) * 100} />
            <ul
                mt="[var(--space-xl)]"
                flex flex-col flex-wrap gap-x="[var(--space-l)]"
            >
                {
                    eventDates.length > 0 && eventDates.map(d => {
                        return (<li key={d.id}
                            mt="[var(--space-xl)]" list-none
                            p="[var(--space-s)] [var(--space-m)]" bg="[var(--color-white)]" rounded="[var(--border-radius)]" shadow="[var(--shadow-small)]"
                            flex-1 flex relative justify-center items-center
                        >
                            <div absolute top="-10px" left="-10px">
                                <Icon name={iconNameMapper[(d.group)] || 'gua'} className="text-20px"></Icon>
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