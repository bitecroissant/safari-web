import { useState } from "react"
import { Icon } from "../components/Icon"
import { Input } from "../components/Input"
import { useAjax } from "../lib/ajax"
import { SubmitHandler, useForm } from "react-hook-form"
import { ToastContainer, toast } from "react-toastify"

type Props = {
    afterPost?: () => void
    creator: string
}

export const PoetryLinesNewPage: React.FC<Props> = (props: Props) => {
    const { afterPost, creator } = props
    const [loading, setLoading] = useState(false)
    const { post } = useAjax()

    const { register, handleSubmit, formState, reset } = useForm<PoetryLinesType>()
    const createPoetryLine: SubmitHandler<PoetryLinesType> = async (formData) => {
        setLoading(true)
        try {
            await post("/poetry_line", { ...formData, createBy: creator })
            setTimeout(() => {
                setLoading(false)
                reset()
                toast("👌 已经将诗句暴扣至瓜瓜的狗头...");
                afterPost?.()
            }, 1222)
        } catch (err) {
            setLoading(false)
        }
    }
  
    return (
        <>
            <ToastContainer />
            <h1>陆陆投递窗</h1>
            <form onSubmit={handleSubmit(createPoetryLine)}
                mt="[var(--space-m)]"
                p="[var(--space-xs)] [var(--space-m)]" bg="[var(--color-white)]" rounded="[var(--border-radius)]" shadow="[var(--shadow-small)]"
            >
                <Input fieldsName="line" register={register} options={{ required: true }} formState={formState} labelName="诗句" placeholder="诗句, 比如：床前明月光" />
                <Input fieldsName="author" register={register} formState={formState} labelName="作者" placeholder="作者, 比如：李白字太白" />
                <Input fieldsName="dynasty" register={register} formState={formState} labelName="朝代" placeholder="朝代,比如：唐" />
                <Input fieldsName="title" register={register} formState={formState} labelName="标题" placeholder="标题,比如： 静夜思" />
                <Input fieldsName="showDate" register={register} formState={formState} labelName="期望展示时间" placeholder="期望展示时间, 比如：2024-11-15" />

                <div flex gap-x="[--space-l]" p="[var(--space-xs)]" >
                    {/* <button onClick={x} className="btn btn--light" >
                        <Icon name="error" />
                    </button> */}
                    <button type="submit" className="btn btn--secondary">
                        {loading ? <Icon name="loading" className="animate-spin" /> : <Icon name="right" />}
                    </button>
                </div>
            </form>
        </>
    )
}