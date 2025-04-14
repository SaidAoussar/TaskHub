import { ClipboardList } from "lucide-react"

interface EmptyStateProps {
  searchQuery?: string
}

export function EmptyState({ searchQuery }: EmptyStateProps) {
  return (
    <div className="flex h-[300px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center animate-in fade-in-50">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
        <ClipboardList className="h-10 w-10 text-primary" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">{searchQuery ? "No matching tasks found" : "No tasks found"}</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        {searchQuery
          ? `No tasks match your search for "${searchQuery}"`
          : "You don't have any tasks in this view. Create a new task to get started."}
      </p>
    </div>
  )
}