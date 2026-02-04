export const DEFAULT_MILESTONES = {
    engineering: [
        { title: "Complete Local Dev Setup", description: "Follow the 'local-setup' guide in docs to configure VS Code, Docker, and the monorepo environment.", week: 1, estimatedTime: 120 },
        { title: "Merge First 'Dodo' PR", description: "Fix a small linting error or documentation typo in our 'dodo' service to get familiar with the CI/CD pipeline.", week: 1, estimatedTime: 240 },
        { title: "Review Architecture Overview", description: "Deep dive into the system architecture documents, specifically the Auth and Data Sync services.", week: 1, estimatedTime: 60 },
        { title: "Deploy First Service change", description: "Shadow a senior engineer during a staging deployment and trigger your first service release.", week: 2, estimatedTime: 180 },
    ],
    design: [
        { title: "Figma Library Access", description: "Get access to the 'Neo-Arcade' Figma organization and review the core design tokens.", week: 1, estimatedTime: 60 },
        { title: "Design System Deep Dive", description: "Review the React component library and ensure alignment with our Atomic Design principles.", week: 1, estimatedTime: 120 },
        { title: "Design-Dev Handover Shadow", description: "Shadow a senior designer during a handover session for an upcoming product feature.", week: 1, estimatedTime: 60 },
    ],
    product: [
        { title: "3-Year Product Vision", description: "Read the 3-year vision doc and prepare at least 3 questions for your session with the CPO.", week: 1, estimatedTime: 60 },
        { title: "Analyze Customer Feedback", description: "Watch 3 recorded customer interviews from last month to understand current pain points.", week: 1, estimatedTime: 90 },
        { title: "Sprint Backlog Refinement", description: "Review the current sprint backlog and participate in your first grooming session.", week: 1, estimatedTime: 60 },
    ],
    general: [
        { title: "HR Compliance Onboarding", description: "Complete all mandatory HR paperwork and review the 'Remote-First' culture handbook.", week: 1, estimatedTime: 60 },
        { title: "Team Introduction", description: "Post a brief intro in #general and #team-chat using our 'fun-fact' template.", week: 1, estimatedTime: 15 },
        { title: "Buddy 1-on-1", description: "Schedule and complete your first coffee chat with your onboarding buddy.", week: 1, estimatedTime: 30 },
    ]
};
