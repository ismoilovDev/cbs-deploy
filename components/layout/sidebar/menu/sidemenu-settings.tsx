import { ClipboardList, ListTodo, Settings, User, User2, User2Icon, UserCircle, Wallet } from "lucide-react";
import { SidemenuItem } from "./sidemenu-item";

// demo setting pages#
const nav_settings_links = [
   {
      title: 'Hisobotlar',
      icon: <ClipboardList />,
      contents: [

      ]
   },
   {
      title: 'Sozlamalar',
      icon: <Settings />,
      contents: [
         { content: 'Foydalanuvchilar', path: '/helper/users' },
         { content: 'Filiallar', path: '/helper/branches' },
         { content: 'Banklar', path: '/helper/banks' },
         { content: 'Bo\'limlar', path: '/' },
         { content: 'Xodimlar', path: '/' },
         { content: 'Qo\'llanma', path: '/' },
         { content: 'Tizim sozlamalari', path: '/settings' },

      ]
   },
   {
      title: 'Profil',
      icon: <UserCircle />,
      contents: [

      ]
   },
]

export default function SidemenuSettings() {
   return (
      <div id="sidemenu-settings" className="sidemenu-links">
         {
            nav_settings_links.map(item => (
               <SidemenuItem key={item.title} details={item} />
            ))
         }
      </div>
   )
}