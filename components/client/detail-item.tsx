export function DetailItem({ title, value }: { title: string, value: string }) {
   return (
      <div className="detail_item">
         <p className="font-semibold mb-1 pl-1 text-indigo-800 dark:text-gray-200">
            {title}
         </p>
         <p className='border-2 hover:border-indigo-700 dark:hover:border-gray-300 transition-all rounded-xl p-2 px-3 font-normal text-sm'>
            {value}
         </p>
      </div>
   )
}