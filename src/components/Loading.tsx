import s from './Loading.module.scss'

export const Loading: React.FC = () => {

    return (
        <div className={s.wrapperwrapper}>
            <div className={s.wrapper}>
                <div className={s.shell}>
                    <div className={s.blob}></div>
                    <div className={s.blob}></div>
                    <div className={s.blob}></div>
                    <div className={s.blob}></div>
                </div>
            </div>
        </div>
    )
}