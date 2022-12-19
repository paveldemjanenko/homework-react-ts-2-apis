import axios, { AxiosError, AxiosRequestConfig } from "axios";

interface HttpError {
    error: String;
}

export const getRequest = <T = any>(url: string): Promise<T> => {
    return axios
        .get<T>(url)
        .then(({ data }) => data)
        .catch((err: AxiosError<HttpError>) => {
            throw err?.response?.data?.error;
        })
};

export const postRequest = <T = any, D = any>(url: string, body?: D, config?:AxiosRequestConfig<D> ): Promise<T> => {
    return axios
        .post<T>(url, body, config)
        .then(({ data }) => data)
        .catch((err: AxiosError<HttpError>) => {
            throw err?.response?.data?.error;
        })
};
