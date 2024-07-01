import { BaseApi } from "@/app/api/[...nextauth]/route"

export const deleteRequest = async (path: string) => {
   const response = await BaseApi.delete(path)
   return response
}