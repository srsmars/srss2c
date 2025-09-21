import React from 'react'

type Props = {
    typographyGuide: any
}

const StyleGuideTypography = ({ typographyGuide }: Props) => {
    return (
        <>
            {typographyGuide.length === 0 ? (
                <div className="text-center py-20">
                    <Type className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium text-foreground mb-2">
                        No typography generated yet
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6">
                        Generate a style guide to see typography recommendations.
                    </p>
                </div>
            ) : (
                <div key={index} className="flex flex-col gap-5">
    <div>
        <h3 className="text-lg font-medium text-foreground/50">
            {section.title}
        </h3>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {section.styles?.map((style: any, styleIndex: number) => (
           <div
    key={styleIndex}
    className="p-6 rounded-2xl backdrop-blur-xl bg-white/[0.02] border border-white/[0.08] saturate-150"
>
    <div className="space-y-4">
    <h4 className="text-lg font-medium text-foreground mb-1">
        {style.name}
    </h4>
    {style.description && (
    <p className="text-sm text-muted-foreground">
        {style.description}
    </p>
    )}
</div>
<div className="flex items-center gap-2">
    <p className="text-sm text-muted-foreground">
        {style.fontFamily}
    </p>
    <p className="text-sm text-muted-foreground">
        {style.fontSize}
    </p>
</div>

<div
    className="text-foreground"
    style={{
        fontFamily: style.fontFamily,
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        lineHeight: style.lineHeight,
        letterSpacing: style.letterSpacing || 'normal',
    }}
>
    The quick brown fox jumps over the lazy dog
</div>
<div className="text-xs text-muted-foreground space-y-1">
    <div>Font: {style.fontFamily}</div>
    <div>Size: {style.fontSize}</div>
    <div>Weight: {style.fontWeight}</div>
    <div>Line Height: {style.lineHeight}</div>
    {style.letterSpacing && (
        <div>Letter Spacing: {style.letterSpacing}</div>
    )}
</div>
    {/* Content of the div would go here */}
</div>
        ))}
    </div>
</div>
            )}
        </>
    )
}

export default StyleGuideTypography