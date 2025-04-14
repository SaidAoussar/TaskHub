import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {isToday , isYesterday, isTomorrow, format} from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)

  if (isToday(date)) {
    return `Today, ${format(date, "h:mm a")}`
  } else if (isYesterday(date)) {
    return `Yesterday, ${format(date, "h:mm a")}`
  } else if (isTomorrow(date)) {
    return `Tomorrow, ${format(date, "h:mm a")}`
  }

  return format(date, "MMM d, yyyy")
}
