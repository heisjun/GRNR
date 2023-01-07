import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export const callApi = async (method?: string, path?: string, data?: any, params = {}): Promise<any> => {
    const headers = {
        'content-type': 'application/json',
    };

    const baseUrl = 'https://www.gardenersclub.co.kr/api';
    const fullUrl = `${baseUrl}${path}`;

    if (method === 'get' || method === 'delete') {
        return axios[method](fullUrl, { headers, params });
    } else if (method === 'post' || method === 'put') {
        return axios[method](fullUrl, data, { headers });
    }
};

export default {
    loadRecentQuestion: (form: any) => callApi('get', '/api/inquiry/recent', null, form),
    questionGet: (id: number) => callApi('get', '/api/inquiry/' + id + '/detail', null),
    getDetailList: (id: number, category: string) => callApi('get', `/api/${category}/${id}/detail`, null),
    searchAddress: (address: string) => callApi('get', '/api/address/view?home=' + address),

    /*testGet: (form: any) => callApi('get', 'api주소', null, form),
    testPost: (form: any) => callApi('post', 'api주소', form, {}),
    testPut: (form: any, id: string) => callApi('put', 'api주소' + id, form, {}),
    testDel: (id: string) => callApi('delete', 'api주소' + id, {}),*/
};

const onRequest = (config: any): AxiosRequestConfig => {
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')?.replaceAll('"', '')}`;
    return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
    return response;
};

const onResponseError = async (error: any): Promise<AxiosError> => {
    if (error.response) {
        //액세스토큰 만료 됐을때 들어오는 error 조건 처리
        if (error.response.status === 401 && error.response.data.errorMessage === '엑세스 토큰이 만료되었습니다.') {
            try {
                const { data } = await axios.post(`https://www.gardenersclub.co.kr/api/`, null, {
                    headers: {
                        'content-type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('accesstoken')?.replaceAll('"', '')}`,
                    },
                    params: {
                        RefreshToken: `Bearer ${localStorage.getItem('refreshtoken')?.replaceAll('"', '')}`,
                    },
                });

                const { accessToken } = data;

                localStorage.setItem('accesstoken', JSON.stringify(accessToken));
                location.reload();
            } catch (_error) {
                if (_error) {
                    localStorage.clear();
                    location.reload();
                }
                return Promise.reject(_error);
            }
        }
    }
    return Promise.reject(error);
};

const setupInterceptorsTo = (axiosInstance: AxiosInstance): AxiosInstance => {
    axiosInstance.interceptors.request.use(onRequest, onRequestError);
    axiosInstance.interceptors.response.use(onResponse, onResponseError);
    return axiosInstance;
};

export const api = setupInterceptorsTo(
    axios.create({
        baseURL: 'https://www.gardenersclub.co.kr/api',
        headers: {
            'Content-Type': 'application/json',
        },
    }),
);
