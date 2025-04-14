export type Task = {
  id: number;
  title: string;
  description: string;
  status:  "completed" | "in_progress" | "to_do";
  priority: "high" | "medium" | "low";
  projectId: number;
  dueDate : string;
  createdAt: string;
}