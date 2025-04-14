"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import type { Project } from "@/types/project.type"
import { CheckCircle2, Clock, Inbox, LayoutGrid, Menu, Plus, X } from "lucide-react"
import { useState } from "react"

interface SidebarProps {
  projects: Project[]
  selectedProject: string
  onSelectProject: (projectId: string) => void
  onNewProject: () => void
}

export function Sidebar({ projects, selectedProject, onSelectProject, onNewProject }: SidebarProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-3 z-50 md:hidden"
        onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
      >
        {isMobileSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform border-r bg-background transition-transform duration-200 ease-in-out md:relative md:translate-x-0",
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-14 items-center border-b px-4">
          <h2 className="text-lg font-semibold">Projects</h2>
        </div>
        <ScrollArea className="h-[calc(100vh-3.5rem)]">
          <div className="px-3 py-2">
            <div className="space-y-1 py-2">
              <h3 className="mb-2 px-4 text-xs font-semibold uppercase text-muted-foreground">Views</h3>
              <Button
                variant={selectedProject === "all" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => onSelectProject("all")}
              >
                <Inbox className="mr-2 h-4 w-4" />
                All Tasks
              </Button>
              <Button
                variant={selectedProject === "today" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => onSelectProject("today")}
              >
                <Clock className="mr-2 h-4 w-4" />
                Today
              </Button>
              <Button
                variant={selectedProject === "completed" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => onSelectProject("completed")}
              >
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Completed
              </Button>
            </div>
            <div className="py-2">
              <div className="flex items-center justify-between mb-2 px-4">
                <h3 className="text-xs font-semibold uppercase text-muted-foreground">Projects</h3>
                <Button variant="ghost" size="icon" className="h-5 w-5" onClick={onNewProject}>
                  <Plus className="h-3 w-3" />
                  <span className="sr-only">Add Project</span>
                </Button>
              </div>
              <div className="space-y-1">
                {projects.map((project) => (
                  <Button
                    key={project.id}
                    variant={selectedProject === project.id.toString() ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => onSelectProject(project.id.toString())}
                  >
                    <LayoutGrid className="mr-2 h-4 w-4" />
                    {project.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </aside>
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setIsMobileSidebarOpen(false)} />
      )}
    </>
  )
}
