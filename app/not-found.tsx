import { TriangleAlert } from "lucide-react"
import Link from "next/link"

function NotFoundPage() {
   return (
      <div className="w-full h-[100vh] bg-slate-950 flex flex-col justify-center items-center">
         <h1 className="flex items-center text-2xl text-red-500 font-semibold">
            <span className="inline-block mr-3">
               <TriangleAlert />
            </span>
            <span>
               Siz hali to'liq tayyor bo'lmagan sahifaga o'tdingiz!
            </span>
         </h1>
         <h1 className="text-2xl text-white font-semibold my-4">Sabr qiling :)</h1>
         <Link className="text-white" href="/">Bosh sahifaga qaytish</Link>
      </div>
   )
}

export default NotFoundPage