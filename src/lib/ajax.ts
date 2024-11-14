import axios, { AxiosError, AxiosRequestConfig } from "axios"

const axiosInstance = axios.create({
    baseURL: isDev ? 'http://127.0.0.1:8787' : 'https://api.muggle.cc',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 5000,
})

export const useAjax = () => {
    const onHttpError = (err: AxiosError) => {
        throw err
    }
    const cleanup = () => {
    }
    const ajax = {
        get: <T> (path: string, config?: AxiosRequestConfig<any> | undefined) => {
            return axiosInstance.get<T>(path, config)
                .catch(onHttpError).finally(cleanup)
        },
        post: <T> (path: string, data: JSONValue, config?: AxiosRequestConfig<any> | undefined) => {
            return axiosInstance.post<T>(path, data, config)
                .catch(onHttpError).finally(cleanup)
        },
        patch: <T> (path: string, data: JSONValue, config?: AxiosRequestConfig<any> | undefined) => {
            return axiosInstance.patch<T>(path, data, config)
                .catch(onHttpError).finally(cleanup)
        },
        destory: <T> (path: string, config?: AxiosRequestConfig<any> | undefined) => {
            return axiosInstance.delete<T>(path, config)
                .catch(onHttpError).finally(cleanup)
        },
    }

    return ajax
}
