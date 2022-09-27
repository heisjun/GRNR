import axios from 'axios';

export const callApi = async (method?: string, path?: string, data?: any, params = {}): Promise<any> => {
    const headers = {
        'content-type': 'application/json',
    };

    const baseUrl = process.env.REACT_APP_BASE_URL;
    const fullUrl = `${baseUrl}${path}`;

    if (method === 'get' || method === 'delete') {
        return axios[method](fullUrl, { headers, params });
    } else if (method === 'post' || method === 'put') {
        return axios[method](fullUrl, data, { headers });
    }
};

export default {
    loadRecentQuestion: (form: any) => callApi('get', '/api/inquiry/recent', null, form),
    /*testGet: (form: any) => callApi('get', 'api주소', null, form),
    testPost: (form: any) => callApi('post', 'api주소', form, {}),
    testPut: (form: any, id: string) => callApi('put', 'api주소' + id, form, {}),
    testDel: (id: string) => callApi('delete', 'api주소' + id, {}),*/
};
