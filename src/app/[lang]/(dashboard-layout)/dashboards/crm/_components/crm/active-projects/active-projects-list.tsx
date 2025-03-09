"use client"

import type { ActiveProjectType } from "../../../types"

import { ActiveProjectsItem } from "./active-projects-item"

export function ActiveProjectsList({ data }: { data: ActiveProjectType[] }) {
  return (
    <ul className="space-y-3">
      {data.map((project, index) => (
        <ActiveProjectsItem key={project.name + index} project={project} />
      ))}
    </ul>
  )
}
