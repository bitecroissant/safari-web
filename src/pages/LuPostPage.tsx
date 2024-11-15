import { useEffect, useState } from "react"
import { useAjax } from "../lib/ajax"
import { Icon } from "../components/Icon"
import s from "./LuPostPage.module.scss"
import c from "classnames"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast, ToastContainer } from "react-toastify"
import { Input } from "../components/Input"

export const LuPostPage: React.FC = () => {

    const [loading, setLoading] = useState(false)
    const { post } = useAjax()

    const { register, handleSubmit, formState, reset } = useForm<PoetryLinesType>()
    const createPoetryLine: SubmitHandler<PoetryLinesType> = async (formData) => {
        setLoading(true)
        console.log(formData)
        try {
            await post("/poetry_line", { ...formData, showDate: '', createBy: "lu" })
            setTimeout(() => {
                setLoading(false)
                reset()
                toast("👌 已经将诗句暴扣至瓜瓜的狗头...");
            }, 1222)
        } catch (err) {
            setLoading(false)
        }
    }
   

    useEffect(() => {
        document.title = '陆陆popo'
    }, [])

    return (
        <>
            <header>
                <Icon name="lu-big2" className={c("h-200px w-auto", s.running)} />
            </header>
            <ToastContainer />
            <h4>陆陆投递窗</h4>
            <form onSubmit={handleSubmit(createPoetryLine)}
                mt="[var(--space-m)]"
                p="[var(--space-xs)] [var(--space-m)]" bg="[var(--color-white)]" rounded="[var(--border-radius)]" shadow="[var(--shadow-small)]"
            >
                <Input fieldsName="line" register={register} options={{ required: true }} formState={formState} labelName="诗句" placeholder="诗句, 比如：床前明月光" />
                <Input fieldsName="author" register={register} formState={formState} labelName="作者" placeholder="作者, 比如：李白字太白" />
                <Input fieldsName="dynasty" register={register} formState={formState} labelName="朝代" placeholder="朝代,比如：唐" />
                <Input fieldsName="title" register={register} formState={formState} labelName="标题" placeholder="标题,比如： 静夜思" />

                <div flex gap-x="[--space-l]" p="[var(--space-xs)]" >
                    <button type="submit" className="btn btn--secondary">
                        {loading ? <Icon name="loading" className="animate-spin" /> : <Icon name="right" />}
                    </button>
                </div>
            </form>
        </>
    )
}