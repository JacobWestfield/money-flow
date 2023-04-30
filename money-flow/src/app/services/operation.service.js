import httpService from "./http.service";

const operationEndpoint = "operation/";

const operationService = {
    get: async () => {
        const { data } = await httpService.get(operationEndpoint);
        return data;
    },
    update: async (payload) => {
        const { data } = await httpService.put(
            operationEndpoint + payload._id,
            payload
        );
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.put(
            operationEndpoint + payload._id,
            payload
        );
        return data;
    },
    delete: async (payload) => {
        const { data } = await httpService.delete(operationEndpoint + payload);
        return data;
    }
};
export default operationService;
