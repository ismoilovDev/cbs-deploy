
export default function SignDate() {
   const now = new Date()

   const date = () => {
      if (now.getDate() < 10 && now.getMonth() + 1 < 10) {
         return `0${now.getDate()}.0${(now.getMonth() + 1)}.${now.getFullYear()}`
      }
      if (now.getDate() < 10) {
         return `0${now.getDate()}.${(now.getMonth() + 1)}.${now.getFullYear()}`
      }
      if (now.getMonth() + 1 < 10) {
         return `${now.getDate()}.0${(now.getMonth() + 1)}.${now.getFullYear()}`
      }
   }
   return (
      <p className="text-xs px-2 border-r-2">{date()}</p>
   )
}
