import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Task } from "@/types/task.type"
import { Project } from "@/types/project.type"
import { CheckCircle, Clock, AlertTriangle } from "lucide-react"

interface StatisticsProps {
  tasks: Task[]
  projects: Project[]
}

export function Statistics({ tasks, projects }: StatisticsProps) {
  const stats = useMemo(() => {
    const completedTasks = tasks.filter((task) => task.status === "completed").length
    const completionRate = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0

    const priorityCounts = {
      high: tasks.filter((task) => task.priority === "high").length,
      medium: tasks.filter((task) => task.priority === "medium").length,
      low: tasks.filter((task) => task.priority === "low").length,
    }

    const today = new Date()
    const nextWeek = new Date(today)
    nextWeek.setDate(today.getDate() + 7)

    const upcomingDeadlines = tasks.filter((task) => {
      if (!task.dueDate || task.status === "completed") return false
      const dueDate = new Date(task.dueDate)
      return dueDate >= today && dueDate <= nextWeek
    })

    const projectStats = projects.map((project) => {
      const projectTasks = tasks.filter((task) => task.projectId === project.id)
      const projectCompleted = projectTasks.filter((task) => task.status === "completed").length
      const projectCompletionRate =
        projectTasks.length > 0 ? Math.round((projectCompleted / projectTasks.length) * 100) : 0

      return {
        id: project.id,
        name: project.name,
        color: project.color,
        totalTasks: projectTasks.length,
        completedTasks: projectCompleted,
        completionRate: projectCompletionRate,
      }
    })

    return {
      total: tasks.length,
      completed: completedTasks,
      completionRate,
      priorityCounts,
      upcomingDeadlines,
      projectStats,
    }
  }, [tasks, projects])

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="mb-4 grid w-full grid-cols-2 bg-muted">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="projects">Projects</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{stats.completionRate}%</div>
                <CheckCircle
                  className={`h-4 w-4 ${stats.completionRate > 50 ? "text-green-500" : "text-orange-500"}`}
                />
              </div>
              <Progress value={stats.completionRate} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">
                {stats.completed} of {stats.total} tasks completed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Priority Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                    <span className="text-sm">High</span>
                  </div>
                  <span className="text-sm font-medium">{stats.priorityCounts.high}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
                    <span className="text-sm">Medium</span>
                  </div>
                  <span className="text-sm font-medium">{stats.priorityCounts.medium}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm">Low</span>
                  </div>
                  <span className="text-sm font-medium">{stats.priorityCounts.low}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Deadlines</CardTitle>
              <CardDescription>Next 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center">
                {stats.upcomingDeadlines.length}
                <Clock className="ml-2 h-4 w-4 text-muted-foreground" />
              </div>
              {stats.upcomingDeadlines.length > 0 ? (
                <div className="mt-2 space-y-1">
                  {stats.upcomingDeadlines.slice(0, 3).map((task) => (
                    <div key={task.id} className="text-xs truncate">
                      {task.title} - {new Date(task.dueDate).toLocaleDateString()}
                    </div>
                  ))}
                  {stats.upcomingDeadlines.length > 3 && (
                    <div className="text-xs text-muted-foreground">+{stats.upcomingDeadlines.length - 3} more</div>
                  )}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground mt-2">No upcoming deadlines</p>
              )}
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="projects" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {stats.projectStats.map((project) => (
            <Card key={project.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: project.color }}></div>
                  <CardTitle className="text-sm font-medium">{project.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{project.completionRate}%</div>
                  {project.totalTasks === 0 ? (
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  ) : (
                    <CheckCircle
                      className={`h-4 w-4 ${project.completionRate > 50 ? "text-green-500" : "text-orange-500"}`}
                    />
                  )}
                </div>
                <Progress value={project.completionRate} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  {project.completedTasks} of {project.totalTasks} tasks completed
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  )
}
