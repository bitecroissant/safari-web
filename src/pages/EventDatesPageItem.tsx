import { time } from "../lib/time"
import { Icon } from "../components/Icon"

const iconNameMapper: Record<string, string> = {
    '瓜': 'gua',
    '陆': 'lu',
    '田': 'tian'
}

const today = time()
today.removeTime()

type Props = {
    item: EventDatesTypes
    kill?: (id: number) => void
}

export const EventDatesPageItem: React.FC<Props> = (props) => {
    const { kill, item: d } = props

    return (
        <>
            <li key={d.id}
                mt="[var(--space-l)]" list-none
                p="[var(--space-xs)] [var(--space-m)]" bg="[var(--color-white)]" rounded="[var(--border-radius)]" shadow="[var(--shadow-small)]"
                flex-1 flex relative justify-center items-center
            >
                <div h-32px w-32px flex justify-center items-center rounded="16px" mr="[var(--space-xs)]"bg-red >
                    <Icon name={iconNameMapper[(d.group)] || 'gua'} className="h-32px leading-32px"></Icon>
                </div>

                <div flex-1 text-14px>
                    <span font-bold text="[var(--color-primary-rotate)]">{d.eventName}</span>
                    <span>{time(d.happenAt).notBefore(today.date) ? '还要' : '过了'}</span>
                    <span font-bold text-24px text="[var(--color-primary)]">
                        {time(d.happenAt).calcNaturalDaysBetween(time())}
                    </span> 
                    <span>天</span>
                </div>
                <div text-12px text="[]">{d.happenAt}</div>

                {kill && <div absolute top="-10px" right="-12px" p-4px onClick={() => kill?.(d.id)} rounded="50%" bg="[var(--color-primary)]" cursor-pointer >
                    <Icon name="error" className="text-14px text-yellow"></Icon>
                </div>}
            </li>
        </>
    )
}