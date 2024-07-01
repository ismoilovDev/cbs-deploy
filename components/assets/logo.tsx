import Image from 'next/image'
import logoPic from '@/public//images/logo_mmt.png'

export function Logo() {
   return (
      <div className="flex items-center logo w-full h-16 border-b-2">
         <Image
            className="w-40 object-cover ml-4"
            width={100}
            height={10}
            src={logoPic}
            alt="logo"
         />
      </div>
   )
}