import { BaseApi } from "@/app/api/[...nextauth]/base-api"

export const deleteRequest = async (path: string) => {
   const response = await BaseApi.delete(path)
   return response
}