import React from 'react';
import { cn } from '@/lib/utils';

interface ListProps {
   children: React.ReactNode;
   className?: string;
}

const List = ({ children, className }: ListProps) => {
   return <ul className={cn('list-disc pl-5', className)}>{children}</ul>;
};

interface ListItemProps {
   children: React.ReactNode;
   className?: string;
}

const ListItem = ({ children, className }: ListItemProps) => {
   return <li className={cn('mb-2', className)}>{children}</li>;
};

export { List, ListItem };