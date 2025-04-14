"use client"

import { Button } from "@/components/ui/button"
import { PlusCircle, BarChart2 } from "lucide-react"
import { Search } from "@/components/search"

interface HeaderProps {
  onNewTask: () => void
  onSearch: (query: string) => void
  onToggleStats: () => void
  showStats: boolean
}

export function Header({ onNewTask, onSearch, onToggleStats, showStats }: HeaderProps) {
  return (
    <header className="border-b bg-background px-4 py-3 md:px-6">
      <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
        <h1 className="text-xl font-semibold md:text-2xl">TaskHub</h1>
        <div className="flex items-center space-x-2">
          <Search onSearch={onSearch} />
          <Button variant="outline" size="icon" onClick={onToggleStats} className={showStats ? "bg-muted" : ""}>
            <BarChart2 className="h-4 w-4" />
            <span className="sr-only">Toggle statistics</span>
          </Button>
          <Button onClick={onNewTask} size="sm" className="gap-1">
            <PlusCircle className="h-4 w-4" />
            <span className="hidden md:inline">New Task</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
