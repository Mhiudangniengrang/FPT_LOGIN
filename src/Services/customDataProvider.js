import axios from './customizeAxios';

const customDataProvider = (apiUrl) => {
    return {
        getList: (resource, params) => {
            const { page, perPage, sort, filter } = params;
            const query = {
                page,
                perPage,
                sort,
                filter,
            };

            // Use axios to make a GET request to your API
            return axios.get(`${resource}`, { params: query })
                .then(response => {
                    console.log(response)
                    return {
                        data: response,
                    };
                })
                .catch(error => {
                    return Promise.reject(error);
                });
        },
    };
};

export default customDataProvider;