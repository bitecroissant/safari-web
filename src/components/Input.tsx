import { FieldValues, FieldPath, UseFormRegister, FormState, RegisterOptions, Path } from 'react-hook-form'
import s from './Input.module.scss'


type Props<T extends FieldValues> = {
    labelName: string
    fieldsName: FieldPath<T>
    placeholder?: string
    register: UseFormRegister<T>
    options?: RegisterOptions<T, Path<T>>
    formState: FormState<T>
}

export const Input = <T extends FieldValues>(props: Props<T>) => {
    const { labelName, fieldsName, placeholder, register, options, formState: { errors } } = props

    return (
        <div flex items-center p="[var(--space-xs)]">
            <label htmlFor={fieldsName} className="visually-hidden">{labelName}</label>
            <input {...register(fieldsName, options)} id={fieldsName} placeholder={placeholder}
                className={s.input}
                style={{ borderColor: errors[fieldsName] ? 'var(--color-primary)' : '--var(--color-light)' }}
            />
            {errors[fieldsName] && <div h="[var(--space-sm)]" ml="[var(--space-xs)]" color="[var(--color-primary)]" >🧙‍♀️ {labelName}必须填写哦</div>}
        </div>
    )
}
