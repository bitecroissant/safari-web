import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAjax } from '../lib/ajax'
import { toast } from 'react-toastify'
import { Icon } from '../components/Icon'
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export const SginInPage: React.FC = () => {
    const nav = useNavigate()
    const [search] = useSearchParams()

    const [loading, setLoading] = useState(false)
    const { post } = useAjax()
    const { register, handleSubmit } = useForm<UserTokens>()


    const createSession: SubmitHandler<UserTokens> = async (formData) => {
        try {
            setLoading(true)
            const response = (await post<UserTokens>("/sessions", formData)).data
            const jwt = response.jwt
            localStorage.setItem('jwt', jwt)
            const from = search.get('from') || '/winter-magic'
            nav(from)
        } catch (err) {
            toast("📎 芝麻开不了门！")
            setLoading(false)
        }
    }

    return (
        <>
            <Dialog open={true} >
                <DialogTitle>
                    <div flex justify-center items-center>
                        <span>请输入口令：</span>
                    </div>
                </DialogTitle>

                <DialogContent>
                    <form >
                        <TextField autoFocus margin='dense' id="token" label="口令" type="text"
                            fullWidth variant="standard"  {...register("token", { required: true })} />
                    </form>
                </DialogContent>

                <DialogActions>
                    <Button type="submit" onClick={handleSubmit(createSession)} endIcon={loading ? <Icon name="loading" className='animate-spin' /> : <SendIcon />}
                        disabled={loading}>
                        <span>{loading ? '验证中' : '验证口令'}</span>
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}