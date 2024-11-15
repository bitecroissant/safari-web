import { useEffect, useState } from "react"
import { useAjax } from "../lib/ajax"
import { PoetryLinesNewPage } from "./PoetryLinesNewPage"

export const LuPostPage: React.FC = () => {

    const [data, setData] = useState<PoetryLinesType[]>()

    const { get } = useAjax()
    const fetchPoetryList = async () => {
        const response = (await get<PoetryLinesType[]>("/poetry_lines")).data
        setData(response)
    }

    useEffect(() => {
        fetchPoetryList()
    }, [])

    return (
        <>
            <header></header>
            <PoetryLinesNewPage creator="lu" />
        </>
    )
}