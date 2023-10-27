import axios from "axios";

const server = axios.create({
    /*DEV*/
    // baseURL: "https://localhost:44357/",

    /*HOM*/
    
    baseURL: "https://toby-api-dev.azurewebsites.net/",

    /*PRD*/
    // baseURL: "http://picmart.grupocmcond.com.br:8084/",
});

export default server;