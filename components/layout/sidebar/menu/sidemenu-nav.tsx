import { BetweenVerticalEnd, Briefcase, Contact, ListTodo, SquareUser, User, Wallet } from "lucide-react";
import { SidemenuItem } from "./sidemenu-item";


// demo pages#
const nav_links = [
   {
      title: 'Mijozlar',
      icon: <User />,
      contents: [
         { content: 'Jismoniy shaxslar', path: '/physical-clients?page=1&limit=10' },
         { content: 'Yuridik shaxslar', path: '/juridical-clients' },
         { content: 'Guruhlar', path: '/groups' },
      ]
   },
   {
      title: 'Hujjatlar',
      icon: <Wallet />,
      contents: [

      ]
   },
   {
      title: 'Operatsiyalar',
      icon: <ListTodo />,
      contents: [

      ]
   },
]

export default function SidemenuNav() {
   return (
      <div id="sidemenu-nav" className="sidemenu-links mt-3">
         {
            nav_links.map(item => (
               <SidemenuItem key={item.title} details={item} />
            ))
         }
      </div>
   )
}