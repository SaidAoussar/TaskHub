import type { Task } from "@/types/task.type"
import { formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Calendar, Edit, MoreVertical, Trash } from "lucide-react"
import { cn } from "@/lib/utils"
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface TaskCardProps {
  task: Task
  onToggleStatus?: (taskId: string) => void
  onEdit?: (task: Task) => void
  onDelete?: (taskId: string) => void
}

export function TaskCard({ task, onToggleStatus, onEdit, onDelete }: TaskCardProps) {


  const project = useSelector((state: RootState) =>
    state.projects.data.find((p) => p.id === task.projectId)
  );

  const priorityColors = {
    low: "border-green-500 text-green-700 dark:text-green-400",
    medium: "border-yellow-500 text-yellow-700 dark:text-yellow-400",
    high: "border-red-500 text-red-700 dark:text-red-400",
  }

  const statusColors = {
    "to_do": "border-blue-500 text-blue-700 dark:text-blue-400",
    "in_progress": "border-purple-500 text-purple-700 dark:text-purple-400",
    completed: "border-green-500 text-green-700 dark:text-green-400",
  }

  const statusLabels = {
    "to_do": "To Do",
    "in_progress": "In Progress",
    completed: "Completed",
  }

  return (
    <Card className={task.status === "completed" ? "opacity-60" : ""}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div>
          <h3 className={`font-medium leading-none ${task.status === "completed" ? "line-through" : ""}`}>
            {task.title}
          </h3>
          <p className="text-sm text-muted-foreground pt-1">{project.name}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(task)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onToggleStatus(task.id)}>
              {task.status === "completed" ? "Mark as Todo" : "Mark as Completed"}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(task.id)} className="text-destructive focus:text-destructive">
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{task.description || "No description provided."}</p>
      </CardContent>
      <CardFooter className="flex flex-col space-y-3 pt-2">
        <div className="flex w-full items-center text-sm text-muted-foreground">
          <Calendar className="mr-2 h-4 w-4" />
          {task.dueDate ? formatDate(task.dueDate) : "No due date"}
        </div>
        <div className="flex w-full flex-wrap gap-2">
          <Badge variant="outline" className={cn("border-2", statusColors[task.status])}>
            {statusLabels[task.status]}
          </Badge>
          <Badge variant="outline" className={cn("border-2", priorityColors[task.priority])}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </Badge>
        </div>
      </CardFooter>
    </Card>
  )
}
