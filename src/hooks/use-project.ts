'use client'

import { createProjectStart } from '@/redux/slice/projects'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { toast } from 'sonner'
import { api } from '../../convex/_generated/api'
import { fetchMutation } from 'convex/nextjs'
import { addProject, createProjectFailure, createProjectSuccess } from '@/redux/slices/projects'

const generateGradientThumbnail = () => {
  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)',
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  ]

  const randomGradient = gradients[Math.floor(Math.random() * gradients.length)]

  const svgContent = `
    <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${
            randomGradient.match(/#[a-fA-F0-9]{6}/g)?.[0] || '#667eea'
          }" />
          <stop offset="100%" style="stop-color:${
            randomGradient.match(/#[a-fA-F0-9]{6}/g)?.[1] || '#764ba2'
          }" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)" />
      <circle cx="150" cy="100" r="30" fill="white" opacity="0.8" />
      <path d="M140 90 L160 90 L160 110 L140 110 Z" fill="white" opacity="0.6" />
    </svg>
  `

  return `data:image/svg+xml;base64,${btoa(svgContent)}`
}

export const useProjectCreation = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.profile)
  const projectsState = useAppSelector((state) => state.projects)

  const createProject = async () => {
    if (!user?.id) {
      toast.error('Please sign in to create projects')
      return
    }

    dispatch(createProjectStart())

    try {
      const thumbnail = generateGradientThumbnail()

      // Note: `name` and `shapesState` are used but not defined in this snippet.
      // Make sure to define or pass them appropriately in your actual code.
      const result = await fetchMutation(api.projects.createProject, {
        userId: user.id as Id<'users'>,
        name: name || undefined,
        sketchesData: {
          shapes: shapesState.shapes,
          tool: shapesState.tool,
          selected: shapesState.selected,
          frameCount: shapesState.frameCounter,
        },
        thumbnail,
      })

      dispatch(
        addProject({
          _id: result.projectId,
          name: result.name,
          projectNumber: result.projectNumber,
          thumbnail,
          lastModified: Date.now(),
          createdAt: Date.now(),
          isPublic: false,
        })
      )
      dispatch(createProjectSuccess())
      toast.success('Project created successfully!')
    } catch (error) {
      dispatch(createProjectFailure('Failed to create project'))
      toast.error('Failed to create project')
    }
  }

  return {
    isCreating: projectsState.isCreating,
    projects: projectsState.projects,
    projectsTotal: projectsState.total,
    canCreate: !!user?.id,
    createProject,
  }
}
