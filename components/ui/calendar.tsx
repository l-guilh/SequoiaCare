"\"use client"

import type * as React from "react"
import { Calendar as CalendarPrimitive } from "react-day-picker"

import { cn } from "@/lib/utils"

export interface CalendarProps extends React.ComponentProps<typeof CalendarPrimitive> {}

function Calendar({ className, ...props }: CalendarProps) {
  return (
    <CalendarPrimitive
      className={cn(
        "p-3",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        "rounded-md border",
        className,
      )}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }

