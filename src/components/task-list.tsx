import type { Task } from "@/types/task.type"
import { TaskCard } from "@/components/task-card"
import { EmptyState } from "@/components/empty-state"

interface TaskListProps {
  tasks: Task[]
  onToggleStatus: (taskId: string) => void
  onEdit: (task: Task) => void
  onDelete: (taskId: string) => void
  searchQuery?: string
}

export function TaskList({ tasks, onToggleStatus, onEdit, onDelete, searchQuery }: TaskListProps) {
  if (tasks.length === 0) {
    return <EmptyState searchQuery={searchQuery} />
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onToggleStatus={onToggleStatus} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  )
}