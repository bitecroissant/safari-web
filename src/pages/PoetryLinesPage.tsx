import { useEffect, useState } from "react"
import { useAjax } from "../lib/ajax"
import { PoetryLinesNewPage } from "./PoetryLinesNewPage"
import { time } from "../lib/time"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

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
        await destory(`/poetry_line?id=${id}&kill=true`)
        toast("😶‍🌫️ 删掉了");
        fetchPoetryList()
    }

    const delate = async (id: number) => {
        await destory(`/poetry_line?id=${id}`)
        toast("😶‍🌫️ 删掉了");
        fetchPoetryList()
    }

    const edit = (item: PoetryLinesType) => {
        const q = Object.keys(item).map((key) => `${key}=${encodeURIComponent(item[key as keyof PoetryLinesType] as string)}`).join('&')
        nav(`/poetry-lines/edit?${q}`)
    }

    return (
        <>

            <header></header>
            <PoetryLinesNewPage afterPost={fetchPoetryList} creator="gua" />
            {loading ? (<div>loading</div>) : SHOW_GROUP.map(g => {
                return (
                    <section key={g} mt="[var(--space-xl)]">
                        <h4>{SHOW_GROUP_NAME[g]}</h4>
                        <ul flex flex-wrap gap-x="[var(--space-l)]">
                            {groupedPoetryLine[g]?.map((item) => {
                                const { id, gmtCreate, gmtModified, isDeleted, line, author, dynasty, title, showDate, createBy } = item
                                return (
                                    <li key={id}
                                        mt="[var(--space-m)]" list-none w="[var(--space-poetryline)]" max-w="[var(--space-poetryline)]"
                                        p="[var(--space-xs)] [var(--space-m)]" bg="[var(--color-white)]" rounded="[var(--border-radius)]" shadow="[var(--shadow-small)]"
                                        flex flex-col
                                    >
                                        <div>{id}</div>
                                        <button onClick={() => kill(id)}> 真的删除 </button>
                                        <button onClick={() => delate(id)}> 假的删除 </button>
                                        <button onClick={() => edit(item)}>更新(全量字段)</button>
                                        <div>{gmtCreate}</div>
                                        <div>{gmtModified}</div>
                                        <div>{isDeleted}</div>
                                        <div>{line}</div>
                                        <div>{author}</div>
                                        <div>{dynasty}</div>
                                        <div>{title}</div>
                                        <div>{showDate}</div>
                                        <div>{createBy}</div>
                                    </li>
                                )
                            })}
                        </ul>
                    </section>
                )
            })}
        </>
    )
}