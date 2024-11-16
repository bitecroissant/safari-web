import { useState } from "react"
import { Icon } from "../components/Icon"
import { Input } from "../components/Input"
import { useAjax } from "../lib/ajax"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { Link, useSearchParams } from "react-router-dom"



export const PoetryLinesEditPage: React.FC = () => {
    const [editPoetryLine] = useSearchParams()
    const { register, handleSubmit, formState } = useForm<PoetryLinesType>({
        defaultValues: {
            id: Number(editPoetryLine.get('id')),
            isDeleted: Number(editPoetryLine.get('isDeleted')),
            line: editPoetryLine.get('line') || '',
            author: editPoetryLine.get('author') || '',
            dynasty: editPoetryLine.get('dynasty') || '',
            title: editPoetryLine.get('title') || '',
            showDate: editPoetryLine.get('showDate') || '',
            createBy: editPoetryLine.get('createBy') || '',
        }
    })
    const { patch } = useAjax()
    const [loading, setLoading] = useState(false)
    const updatePoetryLine: SubmitHandler<PoetryLinesType> = async (formData) => {
        setLoading(true)
        try {
            await patch("/poetry_line", { ...formData, id: formData.id + '' })
            setLoading(false)
            toast("🥸 之前的数据已经无法挽回...");
        } catch (err) {
            setLoading(false)
        }
    }

    return (
        <>
            <Link to="/poetry-lines" className="flex items-center">
                <Icon name="back" className="mr-8px" /> 返回
            </Link>
            <form onSubmit={handleSubmit(updatePoetryLine)}
                mt="[var(--space-m)]"
                p="[var(--space-xs)] [var(--space-m)]" bg="[var(--color-white)]" rounded="[var(--border-radius)]" shadow="[var(--shadow-small)]"
            >
                <Input fieldsName="id" register={register} options={{ required: true }} formState={formState} labelName="ID" disabled={true} />
                <Input fieldsName="line" register={register} options={{ required: true }} formState={formState} labelName="诗句" placeholder="诗句, 比如：床前明月光" />
                <Input fieldsName="author" register={register} formState={formState} labelName="作者" placeholder="作者, 比如：李白字太白" />
                <Input fieldsName="dynasty" register={register} formState={formState} labelName="朝代" placeholder="朝代,比如：唐" />
                <Input fieldsName="title" register={register} formState={formState} labelName="标题" placeholder="标题,比如： 静夜思" />
                <Input fieldsName="showDate" register={register} formState={formState} labelName="期望展示时间" placeholder="期望展示时间, 比如：2024-11-15" />

                <div flex gap-x="[--space-l]" p="[var(--space-xs)]" >
                    <button type="submit" className="btn btn--secondary">
                        {loading ? <Icon name="loading" className="animate-spin" /> : '变更'}
                    </button>
                </div>
            </form>
        </>
    )
}

