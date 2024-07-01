import Link from "next/link"
import { CircleDashed } from "lucide-react"

export const SidebarLink = ({ path, content }: { path: string, content: string }) => {
   return (
      <li className="flex items-center my-1 hover:bg-slate-100/80 dark:hover:bg-gray-700 p-2 pl-3 rounded cursor-pointer">
         <span className="mr-2">
            <CircleDashed style={{ width: '8px' }} />
         </span>
         <Link className="block" href={path}>{content}</Link>
      </li>
   )

}