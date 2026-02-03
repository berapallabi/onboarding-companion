
export const DEFAULT_MILESTONES = {
    engineering: [
        { title: "Complete System Setup", description: "Install VS Code, Docker, and Node.js", week: 1, estimatedTime: 120 },
        { title: "First PR Merged", description: "Fix a small bug or add documentation", week: 1, estimatedTime: 240 },
        { title: "Architecture Overview", description: "Read the system architecture docs", week: 1, estimatedTime: 60 },
        { title: "Deploy to Staging", description: "Deploy your first change to staging", week: 2, estimatedTime: 180 },
    ],
    design: [
        { title: "Figma Setup", description: "Get access to Figma organization", week: 1, estimatedTime: 60 },
        { title: "Design System 101", description: "Review the components library", week: 1, estimatedTime: 120 },
        { title: "Shadow Session", description: "Shadow a senior designer", week: 1, estimatedTime: 60 },
    ],
    product: [
        { title: "Product Vision", description: "Read the 3-year vision doc", week: 1, estimatedTime: 60 },
        { title: "Customer Interviews", description: "Watch 3 recorded interviews", week: 1, estimatedTime: 90 },
        { title: "Backlog Review", description: "Review the current sprint backlog", week: 1, estimatedTime: 60 },
    ],
    general: [
        { title: "HR Onboarding", description: "Complete HR paperwork", week: 1, estimatedTime: 60 },
        { title: "Team Intro", description: "Introduce yourself in Slack", week: 1, estimatedTime: 15 },
    ]
};
