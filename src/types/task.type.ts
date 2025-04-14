export type Task = {
  id: string;
  title: string;
  description: string;
  status:  "completed" | "in_progress" | "to_do";
  priority: "high" | "medium" | "low";
  projectId: string;
  dueDate : string;
  createdAt: string;
}