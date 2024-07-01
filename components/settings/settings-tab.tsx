import React from 'react';
import { Card } from '@/components/ui/card';
import { AlignHorizontalDistributeCenter, Settings } from 'lucide-react';
import Link from 'next/link';

const settings = [
   {
      title: "Hisob sozlamalari",
      icon: <Settings />,
      path: '/settings/account'
   },
   {
      title: "Tizimga kirish",
      icon: <AlignHorizontalDistributeCenter />,
      path: '/settings/auth'
   },
]
const SettingsTab: React.FC = () => {
   return (
      <Card className='p-4 basis-1/5'>
         <div>
            {
               settings.map(item => (
                  <div>
                     <Link href={`${item.path}`}>
                        <span>
                           {item.icon}
                        </span>
                        <span>
                           {item.title}
                        </span>
                     </Link>
                  </div>
               ))
            }
         </div>
      </Card>
   );
};

export default SettingsTab;