import { useEffect, useState } from "react"
import { useAjax } from "../lib/ajax"
import { SubmitHandler, useForm } from "react-hook-form"

export const PoetryLinesPage: React.FC = () => {

    const [data, setData] = useState<PoetryLinesType[]>()

    const { get, post } = useAjax()
    const fetchPoetryList = async () => {
        const response = (await get<PoetryLinesType[]>("/poetry_lines")).data
        setData(response)
    }

    useEffect(() => {
        fetchPoetryList()
    }, [])

    const { register, handleSubmit, formState: { errors } } = useForm<PoetryLinesType>()
    const createPoetryLine: SubmitHandler<PoetryLinesType> = (formData) => {
        console.log(formData)
        post("/poetry_line", formData)
    }
    return (
        <>
            <header>PoetryLinesPage</header>
            <div>
                <h1>录一行诗句</h1>
                <form onSubmit={handleSubmit(createPoetryLine)}>
                    {/* register your input into the hook by invoking the "register" function */}
                    <label htmlFor="line">诗句</label>
                    <div>
                        <input {...register("line", { required: true })} id="line" placeholder="比如：床前明月光" />
                        {errors.line && <span>line is required</span>}
                    </div>
                    <label htmlFor="author">作者</label>
                    <input {...register("author")} id="author" placeholder="比如：李白字太白" />
                    <label htmlFor="dynasty">朝代</label>
                    <input {...register("dynasty")} id="dynasty" placeholder="比如：唐"/>
                    <label htmlFor="title">标题</label>
                    <input {...register("title") } id="title" placeholder="比如： 静夜思" />
                    <label htmlFor="showDate">期望展示时间</label>
                    <input {...register("showDate")} id="showDate" placeholder="比如：2024-11-15" />
                    <input type="submit" />
                </form>
            </div>
            <ul>
                {data?.map(({ id, line }) => {
                    return (
                        <li key={id}>
                            {line}
                        </li>
                    )
                })}
            </ul>
        </>
    )
}