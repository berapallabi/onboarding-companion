export const DEFAULT_MILESTONES: Record<string, Array<{ title: string, description: string, week: number, estimatedTime: number, skillTarget?: string }>> = {
    engineering: [
        { title: "Complete Local Dev Setup", description: "Follow the 'local-setup' guide in docs to configure VS Code, Docker, and the monorepo environment.", week: 1, estimatedTime: 120 },
        { title: "Merge First 'Dodo' PR", description: "Fix a small linting error or documentation typo in our 'dodo' service to get familiar with the CI/CD pipeline.", week: 1, estimatedTime: 240 },
        { title: "Review Architecture Overview", description: "Deep dive into the system architecture documents, specifically the Auth and Data Sync services.", week: 1, estimatedTime: 60 },
        { title: "K8s Cluster Access & Dashboard", description: "Request namespace access and set up 'k9s' or Lens to monitor our staging environment.", week: 2, estimatedTime: 120, skillTarget: "Kubernetes" },
        { title: "React Component Migration", description: "Migrate an old class-component in the dashboard to functional components using our new hooks pattern.", week: 1, estimatedTime: 180, skillTarget: "React" },
        { title: "Deploy First Service change", description: "Shadow a senior engineer during a staging deployment and trigger your first service release.", week: 2, estimatedTime: 180 },
    ],
    design: [
        { title: "Figma Library Access", description: "Get access to the 'Neo-Arcade' Figma organization and review the core design tokens.", week: 1, estimatedTime: 60, skillTarget: "Figma" },
        { title: "Design System Deep Dive", description: "Review the React component library and ensure alignment with our Atomic Design principles.", week: 1, estimatedTime: 120, skillTarget: "Design Systems" },
        { title: "Prototyping Workshop", description: "Learn our animation standards for high-fidelity handovers.", week: 2, estimatedTime: 90, skillTarget: "Prototyping" },
        { title: "Design-Dev Handover Shadow", description: "Shadow a senior designer during a handover session for an upcoming product feature.", week: 1, estimatedTime: 60 },
    ],
    product: [
        { title: "3-Year Product Vision", description: "Read the 3-year vision doc and prepare at least 3 questions for your session with the CPO.", week: 1, estimatedTime: 60 },
        { title: "Jira Dashboard Setup", description: "Configure your personal board to track metrics for the 'Global Expansion' project.", week: 1, estimatedTime: 45, skillTarget: "Jira/Asana" },
        { title: "Analyze Customer Feedback", description: "Watch 3 recorded customer interviews from last month to understand current pain points.", week: 1, estimatedTime: 90, skillTarget: "Data Analysis" },
        { title: "Sprint Backlog Refinement", description: "Review the current sprint backlog and participate in your first grooming session.", week: 1, estimatedTime: 60, skillTarget: "Agile/Scrum" },
    ],
    marketing: [
        { title: "Brand Identity Review", description: "Review our brand guidelines, tone of voice, and visual assets in the DAM.", week: 1, estimatedTime: 60, skillTarget: "Brand Identity" },
        { title: "SEO Tooling Setup", description: "Set up access to Ahrefs, SEMRush, and Google Search Console.", week: 1, estimatedTime: 45, skillTarget: "SEO" },
        { title: "PPC Campaign Shadow", description: "Shadow the performance lead during a weekly spend adjustment session.", week: 2, estimatedTime: 90, skillTarget: "PPC Advertising" },
        { title: "Join Campaign Sync", description: "Attend your first weekly campaign planning meeting as a shadow participant.", week: 2, estimatedTime: 60 },
    ],
    general: [
        { title: "HR Compliance Onboarding", description: "Complete all mandatory HR paperwork and review the 'Remote-First' culture handbook.", week: 1, estimatedTime: 60 },
        { title: "Team Introduction", description: "Post a brief intro in #general and #team-chat using our 'fun-fact' template.", week: 1, estimatedTime: 15 },
        { title: "Buddy 1-on-1", description: "Schedule and complete your first coffee chat with your onboarding buddy.", week: 1, estimatedTime: 30 },
        { title: "Benefits Enrollment", description: "Review and select your health insurance and retirement benefits in the portal.", week: 1, estimatedTime: 45 },
    ]
};
