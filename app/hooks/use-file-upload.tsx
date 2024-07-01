import { useState, useCallback, ChangeEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { UploadedFile } from '@/types';
import { BaseApi } from '../api/[...nextauth]/route';
import { useToast } from '@/components/ui/use-toast';

export const useFileHandler = () => {
   const [files, setFiles] = useState<UploadedFile[]>([]);
   const [uploadedFilePaths, setUploadedFilePaths] = useState<string[]>([]);
   const { toast } = useToast();

   const handleFilesSelect = useCallback((event: ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = event.target.files;
      if (selectedFiles) {
         const newFiles = Array.from(selectedFiles).map(file => ({
            id: uuidv4(),
            name: file.name,
            url: URL.createObjectURL(file),
            type: file.type,
            size: file.size,
            file: file
         }));
         setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      }
   }, []);

   const removeSelectedFile = useCallback((id: string) => {
      setFiles(files.filter(file => file.id !== id));
   }, [files]);

   const uploadFiles = useCallback(async (type: string) => {
      if (files.length === 0) { toast({ title: 'Fayllar tanlanmagan!' }); return; };

      if (files.some(file => file.size > 1024 * 1024 * 5)) { toast({ title: 'Fayl hajmi 5 MB dan oshmasligi kerak!' }); return; }

      if (files.some(file => !['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'].includes(file.type))) { toast({ title: 'Fayl formati jpg, jpeg, png yoki pdf bo\'lishi kerak!' }); return; }

      const formData = new FormData();
      files.forEach(file => formData.append('files', file.file));
      formData.append('type', type);

      try {
         const res = await BaseApi.post('/files', formData);
         const paths = res.data.data.map((item: any) => item.url);
         setUploadedFilePaths(paths);
         toast({ title: 'Fayllar muvaffaqiyatli yuklandi!' });
         return paths;
      } catch (error: any) {
         toast({
            variant: "destructive",
            title: error.response.data.message.toUpperCase() || "Xatolik yuz berdi",
            description: JSON.stringify(new Date())
         });
         throw error;
      }
   }, [files]);

   return {
      files,
      uploadedFilePaths,
      handleFilesSelect,
      removeSelectedFile,
      uploadFiles
   };
};