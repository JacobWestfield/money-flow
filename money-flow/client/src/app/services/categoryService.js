import httpService from "./http.service";

const categoryEndpoint = "category/";

const categoryService = {
    get: async () => {
        const { data } = await httpService.get(categoryEndpoint);
        return data;
    },
    update: async (payload) => {
        const { data } = await httpService.patch(
            categoryEndpoint + payload._id,
            payload
        );
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.post(
            categoryEndpoint + payload._id,
            payload
        );
        return data;
    },
    delete: async (payload) => {
        const data = await httpService.delete(categoryEndpoint + payload);
        return data;
    }
};
export default categoryService;
