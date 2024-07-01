import { getSession } from "next-auth/react"

export async function GET() {
   const session = await getSession()
   if (!session) {
      return new Response(null, { status: 401 })
   }
}