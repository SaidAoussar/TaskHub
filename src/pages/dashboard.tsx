import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects, addProject } from "@/redux/projectsSlice";
import { fetchAllTasks, addTask, updateTask, deleteTask, toggleTaskStatus } from "@/redux/tasksSlice";
import { RootState, AppDispatch } from "@/redux/store";

import { Sidebar } from "@/components/sidebar"
import { TaskList } from "@/components/task-list"
import { Header } from "@/components/header"
import { TaskForm } from "@/components/task-form"
import { ProjectForm } from "@/components/project-form"
import { Statistics } from "@/components/statistics"
import { Task } from "@/types/task.type"
import { Project } from "@/types/project.type"

export function Dashboard() {
  const [selectedProject, setSelectedProject] = useState<string>("all")
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showStats, setShowStats] = useState(false)

  const dispatch = useDispatch<AppDispatch>();

  const { data: projects, loading: loadingProjects } = useSelector(
    (state: RootState) => state.projects
  );

  const { data: tasks, loading: loadingTasks } = useSelector(
    (state: RootState) => state.tasks
  );


  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchAllTasks());
  }, [dispatch]);

  if (loadingProjects || loadingTasks) return <p>Loading...</p>;




  const filteredTasks = tasks.filter((task) => {

    console.log("selected project: ", selectedProject);
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      if (!task.title.toLowerCase().includes(query) && !task.description.toLowerCase().includes(query)) {
        return false
      }
    }

    if (selectedProject === "all") {
      return true
    } else if (selectedProject === "completed") {
      return task.status === "completed"
    } else if (selectedProject === "today") {
      if (!task.dueDate) return false
      const today = new Date()
      const dueDate = new Date(task.dueDate)
      return (
        dueDate.getDate() === today.getDate() &&
        dueDate.getMonth() === today.getMonth() &&
        dueDate.getFullYear() === today.getFullYear()
      )
    } else {
      return task.projectId.toString() === selectedProject
    }
  })

  const createTask = (task: Task) => {
    dispatch(addTask(task));
    setIsTaskFormOpen(false)
    setEditingTask(null)
  }

  const editTask = (updatedTask: Task) => {
    dispatch(updateTask(updatedTask));
    setIsTaskFormOpen(false)
    setEditingTask(null)
  }

  const removeTask = (taskId: string) => {
    if (confirm("Are you sure you want to delete this task?")) {
      dispatch(deleteTask(taskId));
    }
  }

  const handleToggleTaskStatus = (taskId: string) => {
    dispatch(toggleTaskStatus(taskId));

  }

  const openEditForm = (task: Task) => {
    setEditingTask(task)
    setIsTaskFormOpen(true)
  }

  const handleAddProject = (projectData: Omit<Project, "id">) => {
    dispatch(addProject(projectData));
    setIsProjectFormOpen(false)
  }

  return (
    <div className="flex h-screen flex-col md:flex-row">
      <Sidebar
        projects={projects}
        selectedProject={selectedProject}
        onSelectProject={setSelectedProject}
        onNewProject={() => setIsProjectFormOpen(true)}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header
          onNewTask={() => {
            setEditingTask(null)
            setIsTaskFormOpen(true)
          }}
          onSearch={setSearchQuery}
          onToggleStats={() => setShowStats(!showStats)}
          showStats={showStats}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {showStats && (
            <div className="mb-8 rounded-lg border bg-card p-4 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold">Dashboard Statistics</h2>
              <Statistics tasks={tasks} projects={projects} />
            </div>
          )}

          <div className="mt-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {searchQuery ? (
                  <>
                    Search results for "{searchQuery}"
                    <span className="ml-2 text-sm font-normal text-muted-foreground">
                      ({filteredTasks.length} {filteredTasks.length === 1 ? "task" : "tasks"})
                    </span>
                  </>
                ) : selectedProject === "all" ? (
                  "All Tasks"
                ) : selectedProject === "today" ? (
                  "Today's Tasks"
                ) : selectedProject === "completed" ? (
                  "Completed Tasks"
                ) : (
                  projects.find((p) => p.id === selectedProject)?.name || "Tasks"
                )}
              </h2>
            </div>
            <TaskList
              tasks={filteredTasks}
              onToggleStatus={handleToggleTaskStatus}
              onEdit={openEditForm}
              onDelete={removeTask}
            />
          </div>
        </main>
      </div>
      {isTaskFormOpen && (
        <TaskForm
          projects={projects}
          task={editingTask}
          onSubmit={editingTask ? editTask : createTask}
          onCancel={() => {
            setIsTaskFormOpen(false)
            setEditingTask(null)
          }}
        />
      )}
      {isProjectFormOpen && <ProjectForm onSubmit={handleAddProject} onCancel={() => setIsProjectFormOpen(false)} />}
    </div>
  )
}
