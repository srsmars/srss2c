'use client'
import { fetchProjectsSuccess } from '@/redux/slices/projects'
import { useAppDispatch } from '@/redux/store'
import React, { useEffect } from 'react'

type Props = {
    children: React.ReactNode
    initialProjects: any // preloadQuery result with _valueJSON property
}

const ProjectsProvider = ({ children, initialProjects }: Props) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        // Initialize Redux state with SSR data
        if (initialProjects?._valueJSON) {
            const projectsData = initialProjects._valueJSON
            dispatch(
                fetchProjectsSuccess({
                    projects: projectsData,
                    total: projectsData.length,
                })
            )
        }
    }, [dispatch, initialProjects])

    return <>{children}</>
}

export default ProjectsProvider