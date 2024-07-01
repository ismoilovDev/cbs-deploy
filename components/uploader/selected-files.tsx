import React from 'react';
import Image from 'next/image';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { List, ListItem } from '../assets/list';
import { Button } from '../ui/button';
import { XIcon } from 'lucide-react';


interface UploadedFile {
   id: string;
   name: string;
   url: string;
   type: string;
   size: number;
}

interface SelectedFilesProps {
   removeSelectedFile: (id: string) => void;
   selectedFiles: UploadedFile[];
}


export const SelectedFiles: React.FC<SelectedFilesProps> = ({ selectedFiles, removeSelectedFile }) => {
   return (
      <Card className="p-4 h-64 mt-2 rounded-none overflow-y-auto">
         <List className="space-y-2 pl-0">
            {selectedFiles.map((file, index) => (
               <ListItem key={index} className="flex items-center space-x-4 p-2 relative bg-gray-100 dark:bg-gray-700 rounded-sm">
                  {file.type.startsWith('image/') ? (
                     <Image
                        src={file.url}
                        alt={file.name}
                        className="w-16 h-16 rounded-md object-cover"
                        width={64}
                        height={64}
                     />
                  ) : (
                     <Badge>{file.type}</Badge>
                  )}
                  <div className="flex flex-col overflow-hidden">
                     <p className="font-medium">{file.name}</p>
                     <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                  </div>
                  <Button
                     type='button'
                     className='absolute rounded-full flex justify-center items-center bg-red-700 hover:bg-red-700 hover:text-white dark:text-white -top-2 -right-2 w-8 h-8'
                     onClick={() => removeSelectedFile(file.id)}
                  >
                     <XIcon className='absolute w-4 h-4' />
                  </Button>
               </ListItem>
            ))}
         </List>
      </Card>
   );
};