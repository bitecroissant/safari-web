import { useEffect, useState } from "react"
import { useAjax } from "../lib/ajax"
import { PoetryLinesNewPage } from "./PoetryLinesNewPage"
import { time } from "../lib/time"
import { toast, ToastContainer } from "react-toastify"

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

    const { get } = useAjax()
    const fetchPoetryList = async () => {
        const response = (await get<PoetryLinesType[]>("/poetry_lines")).data
        if (response && response.length > 0) {
            const t = { ...groupedPoetryLine }
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
    }

    useEffect(() => {
        fetchPoetryList()
    }, [])

    return (
        <>
            <ToastContainer />
            <header></header>
            <PoetryLinesNewPage afterPost={fetchPoetryList} creator="gua" />
            {SHOW_GROUP.map(g => {
                return (
                    <section key={g} mt="[var(--space-xl)]">
                        <h4>{SHOW_GROUP_NAME[g]}</h4>
                        <ul>
                            {groupedPoetryLine[g]?.map(({ id, gmtCreate, gmtModified, isDeleted, line, author, dynasty, title, showDate, createBy }) => {
                                return (
                                    <li key={id}
                                        mt="[var(--space-m)]" list-none
                                        p="[var(--space-xs)] [var(--space-m)]" bg="[var(--color-white)]" rounded="[var(--border-radius)]" shadow="[var(--shadow-small)]" >
                                        <div>{id}</div>
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