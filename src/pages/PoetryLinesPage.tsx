import { useEffect, useState } from "react"
import { useAjax } from "../lib/ajax"
import { PoetryLinesNewPage } from "./PoetryLinesNewPage"
import { time } from "../lib/time"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { Icon } from "../components/Icon"
import { Dialog, Tab, Tabs } from "@mui/material"
import { PoetryLinesPageItem } from "./PoetryLinesPageItem"

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
    const [destroying, setDestroying] = useState(false)

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
        if (destroying) return
        try {
            setDestroying(true)
            await destory(`/poetry_line?id=${id}`)
            toast("😶‍🌫️ 删掉了");
            setDestroying(false)
            fetchPoetryList()
        } catch (err) {
            setDestroying(false)
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
                        const { id } = item
                        return (
                            <PoetryLinesPageItem key={id} item={item} 
                                killing={killing} kill={kill}
                                destroying={destroying} delate={delate}
                                edit={edit} />
                        )
                    })}
                </ul>
            </section>

        </>
    )
}