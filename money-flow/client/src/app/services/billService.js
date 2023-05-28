import httpService from "./http.service";

const billEndpoint = "bill/";

const billService = {
    get: async () => {
        const { data } = await httpService.get(billEndpoint);
        return data;
    },
    update: async (payload) => {
        const { data } = await httpService.patch(
            billEndpoint + payload._id,
            payload
        );
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.post(
            billEndpoint + payload._id,
            payload
        );
        return data;
    },
    delete: async (payload) => {
        const { data } = await httpService.delete(billEndpoint + payload);
        return data;
    }
};
export default billService;
