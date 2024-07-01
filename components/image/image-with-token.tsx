'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { getImagesWithToken } from '@/app/hooks/use-image-token';
import { useSessionClientComponent } from '@/app/hooks/use-session-client-component';
import { Slider } from '../slider/slider';
import { cn } from '@/lib/utils';
import not_found_img from "../../public/images/user-not-found.png";

type ImageComponentProps = {
   path: string;
   classes?: string;
};

const ImageComponent: React.FC<ImageComponentProps> = ({ path, classes }) => {
   const [imageUrl, setImageUrl] = useState<string | null>(null);
   const [open, setOpen] = useState<boolean>(false);
   const [error, setError] = useState<boolean>(false);
   const { token } = useSessionClientComponent();

   useEffect(() => {
      const fetchImage = async () => {
         try {
            const url = await getImagesWithToken(path, token as string);
            setImageUrl(url);
         } catch (error: any) {
            console.log(error.message);
            setError(true);
         }
      };

      fetchImage();

      return () => {
         if (imageUrl) {
            URL.revokeObjectURL(imageUrl);
         }
      };
   }, [path, token]);

   if (error) return (
      <Image
         width={200}
         height={200}
         src={not_found_img}
         className={'w-auto h-auto rounded-md cursor-pointer'}
         alt="Fetched Image"
      />
   );

   return (
      <div>
         {
            imageUrl &&
            <Image
               width={200}
               height={200}
               src={imageUrl}
               loading='lazy'
               onClick={() => setOpen(true)}
               className={cn('w-auto h-auto rounded-lg cursor-pointer object-cover overflow-hidden', classes)}
               alt="Fetched Image"
            />
         }
         <Slider
            open={open}
            setOpen={setOpen}
            sources={[{ src: imageUrl }] as any}
         />
      </div>
   );
};

export default ImageComponent;
