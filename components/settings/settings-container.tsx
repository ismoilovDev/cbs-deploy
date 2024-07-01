import React, { ReactNode } from 'react';
import { Card } from '@/components/ui/card';


const SettingsContainer = ({ children }: { children: ReactNode }) => {
   return (
      <Card className='basis-4/5 dark:dark:bg-slate-700'>
         {children}
      </Card>
   );
};

export default SettingsContainer;