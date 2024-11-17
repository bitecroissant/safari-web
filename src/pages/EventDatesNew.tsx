import { useState } from "react"
import { useAjax } from "../lib/ajax"
import { Icon } from "../components/Icon"
import { useForm, SubmitHandler } from "react-hook-form"
import { toast } from "react-toastify"
import { Input } from "../components/Input"

type Props = {
    afterPost?: () => void
}

export const EventDatesPageNew: React.FC<Props> = (props) => {
    const { afterPost } = props
    const [loading, setLoading] = useState(false)
    const [isFold, setIsFold] = useState(false)
    const { post } = useAjax()

    const { register, handleSubmit, formState, reset } = useForm<EventDatesTypes>()

    const createEventDates: SubmitHandler<EventDatesTypes> = async (formData) => {
        setLoading(true)
        try {
            await post("/event_date", { ...formData })
            setLoading(false)
            reset()
            toast("👌 新增成功...");
            afterPost?.()
        } catch (err) {
            setLoading(false)
        }
    }

    const fold = (ev: React.MouseEvent) => {
        ev.preventDefault()
        setIsFold(true)
    }
    const unfold = (ev: React.MouseEvent) => {
        ev.preventDefault()
        setIsFold(false)
    }

    return (
        <>
            {
                isFold ? (<button className="btn btn--light" onClick={unfold} >
                    展开
                </button>) : (<form onSubmit={handleSubmit(createEventDates)}
                    mt="[var(--space-m)]"
                    p="[var(--space-xs)] [var(--space-m)]" bg="[var(--color-white)]" rounded="[var(--border-radius)]" shadow="[var(--shadow-small)]"
                >
                    <Input fieldsName="group" register={register} options={{ required: true }} formState={formState} labelName="组别" placeholder="solar_term 或陆、瓜、田" />
                    <Input fieldsName="eventName" register={register} formState={formState} labelName="啥事情" placeholder="事情，比如节气名或理头发、换床单" />
                    <Input fieldsName="happenAt" register={register} formState={formState} labelName="发生时间" placeholder="2024-11-17" />

                    <div flex gap-x="[--space-l]" p="[var(--space-xs)]" >
                        <button type="submit" className="btn btn--secondary">
                            {loading ? <Icon name="loading" className="animate-spin" /> : '新增一行'}
                        </button>
                        <button onClick={fold} className="btn btn--light">
                            收起
                        </button>
                    </div>
                </form>)
            }

        </>
    )
}