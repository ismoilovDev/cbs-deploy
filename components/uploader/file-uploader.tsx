"use client"

import React, { ChangeEvent } from 'react';
import { SelectedFiles } from './selected-files';
import { Button } from '../ui/button';
import { DropZone } from './drop-zone';

interface UploadedFile {
   id: string;
   name: string;
   url: string;
   type: string;
   size: number;
}

interface FileUploaderProps {
   handleUpload: () => void;
   handleFilesSelect: (event: ChangeEvent<HTMLInputElement>) => void;
   removeSelectedFile: (id: string) => void;
   selectedFiles: UploadedFile[];
   isPending: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({ handleUpload, handleFilesSelect, selectedFiles, removeSelectedFile, isPending }) => {
   const preventDefaultAndHandleFilesSelect = (event: ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      handleFilesSelect(event);
   };

   return (
      <div className="file-uploader py-3">
         <div className='grid grid-cols-2 gap-4'>
            <DropZone handleFilesSelect={preventDefaultAndHandleFilesSelect} />
            <SelectedFiles selectedFiles={selectedFiles} removeSelectedFile={removeSelectedFile} />
         </div>
         <div className='flex justify-end'>
            <Button className="mt-4" type='button' disabled={isPending} onClick={handleUpload}>Yuklash</Button>
         </div>
      </div>
   );
};

export default FileUploader;
