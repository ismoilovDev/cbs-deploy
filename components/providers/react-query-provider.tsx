'use client';

import { PropsWithChildren, useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient } from '@tanstack/react-query';


const ReactQueryPvorider: React.FC<PropsWithChildren> = ({ children }) => {
   const [queryClientStore] = useState(
      () => new QueryClient()
   );

   return (
      <QueryClientProvider client={queryClientStore}>
         {children}
         <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
   );
};

export default ReactQueryPvorider;