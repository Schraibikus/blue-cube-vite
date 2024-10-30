import axios from "axios";

export const api = axios.create({ baseURL: import.meta.env.VITE_APP_API_URL }); //установка базового URL на основе данных в файле .env

//так как это учебный проект, то в файле .env.local установлено значение VITE_APP_API_URL=https://skillfactory-task.detmir.team
// export const api = axios.create({ baseURL: "https://skillfactory-task.detmir.team" });
