import { getSession } from "next-auth/react"
import axios, { AxiosInstance } from "axios";


const BaseApi: AxiosInstance = axios.create({
   baseURL: process.env.NEXT_PUBLIC_API_URL,
   headers: {
      "Accept": "application/json",
   },
   withCredentials: true,
});

BaseApi.interceptors.request.use(async (config) => {
   const session = await getSession();
   if (session?.user) {
      config.headers['Authorization'] = `Bearer ${session.user.token}`;
   }
   return config;
}, (error) => {

   if (error) {
      console.log(error)
   }
   return Promise.reject(error);
});

export { BaseApi }