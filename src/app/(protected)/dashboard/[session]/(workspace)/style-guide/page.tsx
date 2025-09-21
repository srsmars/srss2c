import { StyleGuide } from '@/redux/api/style-guide'
import { TabsContent } from '@/components/ui/tabs'
import { MoodBoardImagesQuery, StyleGuideQuery } from '@/convex/query.config'
import React from 'react'
import { MoodBoardImage } from '@/hooks/use-styles'
import { ThemeContent } from '@/components/style/theme'
import StyleGuideTypography from '@/components/style/typography'

type Props = {
    searchParams: Promise<{
        project: string
    }>
}

const Page = async ({ searchParams }: Props) => {
    const projectId = (await searchParams).project
    const existingStyleGuide = await StyleGuideQuery(projectId)

    const guide = existingStyleGuide.styleGuide
        ?._valueJSON as unknown as StyleGuide
    
        const colorGuide = guide?.colorSections || []
const typographyGuide = guide?.typographySections || []

const existingMoodBoardImages = await MoodBoardImagesQuery(projectId)
const guideImages = existingMoodBoardImages.images
 ._valueJSON as unknown as MoodBoardImage[]  // The rest of the component's logic would follow here

    return (
       <div>
    <TabsContent
        value="colours"
        className="space-y-8"
    >
        {!guideImages.length ? (
            <div className="space-y-8">
                <div className="text-center py-20">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-muted flex items-center justify-center">
                        <Palette className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium text-foreground mb-2">
                        No colors generated yet
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
                        Upload images to your mood board and generate an AI-powered
                        style guide with colors and typography.
                    </p>
                </div>
            </div>
        ) : (
            <ThemeContent colorGuide={colorGuide}/>
            <TabsContent value="typography">
    <StyleGuideTypography typographyGuide={typographyGuide} />
</TabsContent>
        )}
    </TabsContent>
</div>
}

export default Page