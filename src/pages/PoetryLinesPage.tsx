import { useEffect, useState } from "react"
import { useAjax } from "../lib/ajax"
import { PoetryLinesNewPage } from "./PoetryLinesNewPage"
import { time } from "../lib/time"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { Icon } from "../components/Icon"
import { Dialog, Tab, Tabs } from "@mui/material"

const SHOW_GROUP = ['todayAndAfter', 'notAssign', 'before']
const SHOW_GROUP_NAME: { [k in typeof SHOW_GROUP[number]]: string } = {
    todayAndAfter: '待播放',
    notAssign: '可播放',
    before: '已播放',
}
type GroupedPoetryLine = {
    [k in typeof SHOW_GROUP[number]]: PoetryLinesType[]
}

export const creator = {
    lu: { name: 'lu', avatar: '' },
    gua: { name: 'gua', avatar: '' },
}

export const PoetryLinesPage: React.FC = () => {
    const nav = useNavigate()
    const getGroupHelper = (poetryLine: PoetryLinesType) => {
        const d = poetryLine.showDate
        if (!d) {
            return 'notAssign'
        }
        const today = time()
        today.removeTime()
        const itemDate = time(d)
        if (itemDate.notBefore(today.date)) {
            return 'todayAndAfter'
        }
        return 'before'
    }

    const [groupedPoetryLine, setGroupedPoetryLine] = useState<GroupedPoetryLine>({})
    const [loading, setLoading] = useState(false)
    const [killing, setKilling] = useState(false)
    const [destorying, setDestorying] = useState(false)

    const [selectedTab, setSelectedTab] = useState(SHOW_GROUP[0])
    const handleTabChange = (e: React.SyntheticEvent, newValue: string) => {
        e.preventDefault()
        setSelectedTab(newValue)
    }

    const { get, destory } = useAjax()
    const fetchPoetryList = async () => {
        setLoading(true)
        try {
            const response = (await get<PoetryLinesType[]>("/poetry_lines")).data
            if (response && response.length > 0) {
                const t = {} as GroupedPoetryLine
                response.forEach((poetryLine) => {
                    const group = getGroupHelper(poetryLine)
                    if (t[group]) {
                        t[group].push(poetryLine)
                        t[group].sort((a, b) => time(a.showDate).timestamp - time(b.showDate).timestamp)
                    } else {
                        t[group] = [poetryLine]
                    }
                })
                setGroupedPoetryLine(t)
            } else {
                setGroupedPoetryLine({})
                toast("🤣 服务器爆炸了... hhh");
            }
            setLoading(false)
        } catch (err) {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPoetryList()
    }, [])

    const kill = async (id: number) => {
        if (killing) return
        try {
            setKilling(true)
            await destory(`/poetry_line?id=${id}&kill=true`)
            toast("😶‍🌫️ 删掉了");
            setKilling(false)
            fetchPoetryList()
        } catch (err) {
            setKilling(false)
        }
    }

    const delate = async (id: number) => {
        if (destorying) return
        try {
            setDestorying(true)
            await destory(`/poetry_line?id=${id}`)
            toast("😶‍🌫️ 删掉了");
            setDestorying(false)
            fetchPoetryList()
        } catch (err) {
            setDestorying(false)
        }
    }

    const edit = (item: PoetryLinesType) => {
        const q = Object.keys(item).map((key) => `${key}=${encodeURIComponent(item[key as keyof PoetryLinesType] as string)}`).join('&')
        nav(`/poetry-lines/edit?${q}`)
    }

    return (
        <>
            <Dialog open={loading} fullScreen >
                <div h-100vh flex justify-center items-center bg="[var(--color-background)]">
                    <Icon name="loading" className="text-36px animate-spin" />
                </div>
            </Dialog>
            <PoetryLinesNewPage afterPost={fetchPoetryList} creator="gua" />

            <Tabs value={selectedTab} onChange={handleTabChange}>
                {SHOW_GROUP.map((g) => {
                    return (<Tab label={SHOW_GROUP_NAME[g]} value={g} key={g}>
                    </Tab>)
                })}
            </Tabs>


            <section mt="[var(--space-xl)]">
                <ul flex flex-wrap gap-x="[var(--space-l)]">
                    {groupedPoetryLine[SHOW_GROUP.filter(g => { return g === selectedTab })[0]]?.map((item) => {
                        const { id, gmtCreate, gmtModified, isDeleted, line, author, dynasty, title, showDate, createBy } = item
                        return (
                            <li key={id}
                                mt="[var(--space-m)]" list-none w="[var(--space-poetryline)]" max-w="[var(--space-poetryline)]"
                                p="[var(--space-xs)] [var(--space-m)]" bg="[var(--color-white)]" rounded="[var(--border-radius)]" shadow="[var(--shadow-small)]"
                                flex flex-col
                                relative
                            >
                                <div w-20px h-20px flex items-center justify-center rounded="50%" bg="red"
                                    absolute top="-10px" left="-10px"
                                >
                                    <span h-14px leading-14px text="yellow">{id}</span>
                                </div>
                                <div flex justify-end>
                                    <button className="btn btn--primary text-14px" onClick={() => kill(id)}>
                                        {killing ? <Icon name="loading" className="animate-spin" /> : '真删'}
                                    </button>
                                    <button className="btn btn--light text-14px ml-8px" onClick={() => delate(id)}>
                                        {destorying ? <Icon name="loading" className="animate-spin" /> : '假删'}
                                    </button>
                                    <button className="btn btn--secondary text-14px ml-8px" onClick={() => edit(item)}>更新</button>
                                </div>
                                <div flex flex-wrap items-center gap-x-8px text-12px mt="8px">
                                    {isDeleted ? (<span bg="[var(--color-text-muted)]" p-4px rounded="4px" text-white>已下线</span>)
                                        : (<span bg="[var(--color-secondary)]" p-4px rounded="4px" text-white>在线</span>)}
                                    <div>{title}</div>
                                    <div>{author}</div>
                                    <div>{dynasty}</div>
                                </div>
                                {isDeleted
                                    ? (<div text-16px text="[var(--color-primary-rotate)]" line-through >{line}</div>)
                                    : (<div text-16px text="[var(--color-primary-rotate)]" >{line}</div>)
                                }

                                <div mt-8px>预计投放时间：{showDate}</div>
                                <div absolute top="-10px" left="20px">
                                    <Icon name={createBy || 'gua'} className="text-20px"></Icon>
                                </div>
                                <div text-12px text="[var(--color-text-muted)]">
                                    <div>入库时间：{gmtCreate}</div>
                                    <div>更新时间：{gmtModified}</div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </section>

        </>
    )
}