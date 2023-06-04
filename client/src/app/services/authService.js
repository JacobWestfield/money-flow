import axios from "axios";
import localStorageService from "./localStorage.service";
import configFile from "../config.json";

const httpAuth = axios.create({
    baseURL: configFile.apiEndpoint + "auth/"
});

const authService = {
    register: async ({ email, password, name }) => {
        console.log(email, password, name);
        console.log("base url", httpAuth.baseURL);
        const { data } = await httpAuth.post(`signUp`, {
            email,
            password,
            name
        });
        return data;
    },
    login: async ({ email, password }) => {
        const { data } = await httpAuth.post(`signInWithPassword`, {
            email,
            password
        });
        return data;
    },
    refresh: async () => {
        const { data } = await httpAuth.post("token", {
            refresh_token: localStorageService.getRefreshToken()
        });
        return data;
    }
};

export default authService;
