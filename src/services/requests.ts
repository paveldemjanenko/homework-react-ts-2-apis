import axios, { AxiosError, AxiosRequestConfig } from "axios";

interface HttpError {
    error: string;
}

interface PostBody {
    firstname: string | null;
    lastname: string | null;
    email: string | null;
    car: string | null;
    purchasedate: Date | null;
}

export const getRequest = <T = any>(url: string): Promise<T> => {
    return axios
        .get<T>(url)
        .then(({ data }) => data)
        .catch((err: AxiosError<HttpError>) => {
            throw err?.response?.data?.error;
        })
};

export const postRequest = <T = any>(url: string, body?: PostBody, config?:AxiosRequestConfig ): Promise<T> => {
    return axios
        .post<T>(url, body, config)
        .then(({ data }) => data)
        .catch((err: AxiosError<HttpError>) => {
            throw err?.response?.data?.error;
        })
};
