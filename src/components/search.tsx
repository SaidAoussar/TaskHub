"use client"

import { useState, useEffect } from "react"
import { SearchIcon, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SearchProps {
  onSearch: (query: string) => void
}

export function Search({ onSearch }: SearchProps) {
  const [query, setQuery] = useState("")

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearch(query)
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [query, onSearch])

  return (
    <div className="relative w-full max-w-sm">
      <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search tasks..."
        className="w-full pl-8 pr-10"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1 h-7 w-7"
          onClick={() => {
            setQuery("")
            onSearch("")
          }}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Clear search</span>
        </Button>
      )}
    </div>
  )
}
