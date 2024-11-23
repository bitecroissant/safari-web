import { Icon } from "../components/Icon"

export const creator = {
    lu: { name: 'lu', avatar: '' },
    gua: { name: 'gua', avatar: '' },
}

type Props = {
    item: PoetryLinesType
    killing: boolean
    kill: (id: number) => void
    destroying: boolean
    delate: (id: number) => void
    edit: (item: PoetryLinesType) => void
}

export const PoetryLinesPageItem: React.FC<Props> = (props: Props) => {
    const { item, killing, kill, destroying, delate, edit } = props
    const { id, gmtCreate, gmtModified, isDeleted, line, author, dynasty, title, showDate, createBy } = item

    return (
        <>
                            <li 
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
                                        {destroying ? <Icon name="loading" className="animate-spin" /> : '假删'}
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
            
       

        </>
    )
}