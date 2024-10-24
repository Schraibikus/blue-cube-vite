import axios from "axios";

export const api = axios.create({ baseURL: import.meta.env.VITE_APP_API_URL }); //установка базового URL на основе данных в файле .env
