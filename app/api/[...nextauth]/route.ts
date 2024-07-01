import { getSession } from "next-auth/react";
import axios from "axios";

const getSessionToken = async () => {
   try {
      const session = await getSession();
      return session?.user?.token;
   } catch (error) {
      console.error("Error retrieving session:", error);
      return null;
   }
};

export const BaseApi = axios.create({
   baseURL: process.env.NEXT_PUBLIC_API_URL,
   headers: {
      "Accept": "application/json",
   },
   withCredentials: true,
});

BaseApi.interceptors.request.use(async (config) => {
   const token = await getSessionToken();
   if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
   }
   return config;
}, (error) => {

   if (error) {
      console.log(error)
   }
   return Promise.reject(error);
});


export { GET, POST } from "@/auth"