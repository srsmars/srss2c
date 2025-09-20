import { v } from 'convex/values'
import { query } from './_generated/server'
import { getAuthUserId } from '@convex-dev/auth/server'

export const getProject = query({
  args: { projectId: v.id('projects') },
  handler: async (ctx, { projectId }) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) throw new Error('Not authenticated')

    const project = await ctx.db.get(projectId)
    if (!project) throw new Error('Project not found')

    // ❌ This condition looks inverted
    if (project.userId !== userId && !project.isPublic) {
      throw new Error('Access denied')
    }

    return project
  },
})


export const createProject = mutation({
  args: {  
    userId: v.id('users'),
    name: v.optional(v.string()),
    sketchesData: v.any(), // JSON structure from Redux shapes state
    thumbnail: v.optional(v.string()),
  },
  handler: async (ctx, { userId, name, sketchesData, thumbnail }) => {
  console.log('✨ [Convex] Creating project for user:', userId)

  const projectNumber = await getNextProjectNumber(ctx, userId)
  const projectName = name || `Project ${projectNumber}`

  const projectId = await ctx.db.insert('projects', {
    userId,
    name: projectName,
    sketchesData,
    thumbnail,
    projectNumber,
    lastModified: Date.now(),
    createdAt: Date.now(),
    isPublic: false,
  })
  
  console.log('✅ [Convex] Project created:', {
  projectId,
  name: projectName,
  projectNumber,
})

return {
  projectId,
  name: projectName,
  projectNumber,
}

})


async function getNextProjectNumber(ctx: any, userId: string): Promise<number> {
  // Look up existing counter for this user
  const counter = await ctx.db
    .query('project_counters')
    .withIndex('by_userId', (q: any) => q.eq('userId', userId))
    .first()

  if (!counter) {
    // No counter yet → create one starting at 1
    await ctx.db.insert('project_counters', {
      userId,
      nextProjectNumber: 2, // First project will be #1, next will be 2
    })
    return 1
  }

    const projectNumber = counter.nextProjectNumber

  // Increment counter for next time
  await ctx.db.patch(counter._id, {
    nextProjectNumber: projectNumber + 1,
  })

  return projectNumber
}