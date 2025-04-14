"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Project } from "@/types/project.type"

interface ProjectFormProps {
  onSubmit: (project: Omit<Project, "id" | "createdAt">) => void
  onCancel: () => void
}

export function ProjectForm({ onSubmit, onCancel }: ProjectFormProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [color, setColor] = useState("#4f46e5")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      name,
      description,
      color,
    })
  }

  // Default color options
  const colors = [
    "#4f46e5", // indigo
    "#10b981", // emerald
    "#f59e0b", // amber
    "#ef4444", // red
    "#8b5cf6", // violet
    "#06b6d4", // cyan
    "#ec4899", // pink
    "#84cc16", // lime
  ]

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Project Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter project name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter project description"
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label>Project Color</Label>
            <div className="grid grid-cols-8 gap-2">
              {colors.map((colorOption) => (
                <button
                  key={colorOption}
                  type="button"
                  className={`h-8 w-8 rounded-full border-2 ${color === colorOption ? "border-black dark:border-white" : "border-transparent"}`}
                  style={{ backgroundColor: colorOption }}
                  onClick={() => setColor(colorOption)}
                  aria-label={`Select color ${colorOption}`}
                />
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={!name.trim()}>
              Create Project
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
