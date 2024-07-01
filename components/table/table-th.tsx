import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TableTh({ column, title }: { column: any, title: string | boolean }) {
   return (
      <Button
         variant="ghost"
         className="w-full justify-between p-0 bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent"
         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
         {title}
         <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
   )
}