export type MilestoneTemplate = {
    title: string;
    description: string;
    week: number;
    estimatedTime: number;
    skillTarget?: string;
};

export const ROLE_MILESTONES: Record<string, MilestoneTemplate[]> = {
    engineering: [
        { title: "Review Architecture Overview", description: "Deep dive into the system architecture documents, specifically the Auth and Data Sync services.", week: 1, estimatedTime: 60 },
        { title: "Merge First 'Dodo' PR", description: "Fix a small linting error or documentation typo in our 'dodo' service to get familiar with the CI/CD pipeline.", week: 1, estimatedTime: 240 },
        { title: "Deploy First Service change", description: "Shadow a senior engineer during a staging deployment and trigger your first service release.", week: 2, estimatedTime: 180 },
    ],
    design: [
        { title: "Design System Deep Dive", description: "Review the React component library and ensure alignment with our Atomic Design principles.", week: 1, estimatedTime: 120 },
        { title: "Design-Dev Handover Shadow", description: "Shadow a senior designer during a handover session for an upcoming product feature.", week: 1, estimatedTime: 60 },
        { title: "Accessibility Audit", description: "Run our accessibility checklist on a core set of dashboard components.", week: 2, estimatedTime: 120 },
    ],
    product: [
        { title: "3-Year Product Vision", description: "Read the 3-year vision doc and prepare at least 3 questions for your session with the CPO.", week: 1, estimatedTime: 60 },
        { title: "Analyze Customer Feedback", description: "Watch 3 recorded customer interviews from last month to understand current pain points.", week: 1, estimatedTime: 90 },
        { title: "Market Research Deep Dive", description: "Competitor analysis for the Southeast Asian market launch.", week: 2, estimatedTime: 180 },
    ],
    marketing: [
        { title: "Brand Identity Review", description: "Review our brand guidelines, tone of voice, and visual assets in the DAM.", week: 1, estimatedTime: 60 },
        { title: "Join Campaign Sync", description: "Attend your first weekly campaign planning meeting as a shadow participant.", week: 2, estimatedTime: 60 },
        { title: "Marketing Strategy Audit", description: "Review the Q4 strategic goals and how we measure success across channels.", week: 2, estimatedTime: 120 },
    ],
    general: [
        { title: "HR Compliance Onboarding", description: "Complete all mandatory HR paperwork and review the 'Remote-First' culture handbook.", week: 1, estimatedTime: 60 },
        { title: "Team Introduction", description: "Post a brief intro in #general and #team-chat using our 'fun-fact' template.", week: 1, estimatedTime: 15 },
        { title: "Buddy 1-on-1", description: "Schedule and complete your first coffee chat with your onboarding buddy.", week: 1, estimatedTime: 30 },
        { title: "Benefits Enrollment", description: "Review and select your health insurance and retirement benefits in the portal.", week: 1, estimatedTime: 45 },
    ]
};

export const TECH_MILESTONES: Record<string, MilestoneTemplate[]> = {
    // ENGINEERING TECHS
    "React": [
        { title: "React Architecture Quiz", description: "Take the internal quiz on our Server Component vs Client Component guidelines.", week: 1, estimatedTime: 45 },
        { title: "React Component Migration", description: "Migrate an old class-component to functional components using our new hooks pattern.", week: 1, estimatedTime: 180 },
        { title: "State Management Review", description: "Deep dive into our Zustand store patterns and how we handle global UI state.", week: 2, estimatedTime: 90 },
    ],
    "TypeScript": [
        { title: "Strict Type Audit", description: "Review our custom Type definitions and ensure no 'any' types are introduced in your first PR.", week: 1, estimatedTime: 60 },
        { title: "Utility Types Deep Dive", description: "Learn how we use Partial and Omit across our DB models for type safety.", week: 2, estimatedTime: 45 },
    ],
    "Kubernetes": [
        { title: "K8s Cluster Access & Dashboard", description: "Request namespace access and set up 'k9s' or Lens to monitor our staging environment.", week: 1, estimatedTime: 120 },
        { title: "Helm Chart Customization", description: "Update the service value overrides for your local dev branch in the helm values file.", week: 2, estimatedTime: 120 },
    ],
    "PostgreSQL": [
        { title: "DB Schema Walkthrough", description: "Review the Drizzle-ORM schema and our naming conventions for tables and indexes.", week: 1, estimatedTime: 60 },
        { title: "Migration Dry Run", description: "Create a mock migration and run a dry-run against the dev database shadow clone.", week: 2, estimatedTime: 90 },
    ],

    // PRODUCT TECHS
    "Jira/Asana": [
        { title: "Jira Dashboard Setup", description: "Configure your personal board to track metrics for the 'Global Expansion' project.", week: 1, estimatedTime: 45 },
        { title: "Agile Workflow Training", description: "Learn how we use story points and custom fields to track cross-team dependencies.", week: 2, estimatedTime: 60 },
    ],
    "Product Roadmap": [
        { title: "Roadmap Tooling Access", description: "Get access to ProductBoard and review the current prioritization matrix.", week: 1, estimatedTime: 30 },
        { title: "Quarterly Planning Shadow", description: "Shadow the lead PM during the upcoming OKR alignment session.", week: 2, estimatedTime: 120 },
    ],
    "Stakeholder Management": [
        { title: "Stakeholder Mapping", description: "Identify key partners across Eng, Design, and Marketing for your assigned feature area.", week: 1, estimatedTime: 60 },
        { title: "Communication Plan Setup", description: "Define your bi-weekly reporting cadence and Slack update channels.", week: 2, estimatedTime: 45 },
    ],
    "Agile/Scrum": [
        { title: "Scrum Ceremony Walkthrough", description: "Review the purpose and expected outputs for our Dailies, Grooming, and retros.", week: 1, estimatedTime: 30 },
        { title: "Sprint Backlog Refinement", description: "Review the current sprint backlog and participate in your first grooming session.", week: 1, estimatedTime: 60 },
    ],

    // DESIGN TECHS
    "Figma": [
        { title: "Figma Library Access", description: "Get access to the 'Neo-Arcade' Figma organization and review the core design tokens.", week: 1, estimatedTime: 60 },
        { title: "Variable Scoping in Figma", description: "Learn how we use Figma variables for multi-theme support (Neo-Dark vs Light).", week: 1, estimatedTime: 45 },
    ],
    "Prototyping": [
        { title: "Prototyping Workshop", description: "Learn our animation standards for high-fidelity handovers.", week: 1, estimatedTime: 90 },
        { title: "Advanced Interaction Lab", description: "Create a complex micro-interaction using Smart Animate for the new dashboard.", week: 2, estimatedTime: 120 },
    ],

    // MARKETING TECHS
    "SEO": [
        { title: "SEO Tooling Setup", description: "Set up access to Ahrefs, SEMRush, and Google Search Console.", week: 1, estimatedTime: 45 },
        { title: "Keyword Strategy Sync", description: "Review our keyword targets for the Q4 'AI Native' campaign.", week: 2, estimatedTime: 60 },
    ],
    "CRM": [
        { title: "HubSpot Basics Training", description: "Complete the internal certification for our custom CRM lifecycle stages.", week: 1, estimatedTime: 120 },
        { title: "CRM Segmentation Audit", description: "Review how we categorize users in HubSpot for our automated drip campaigns.", week: 2, estimatedTime: 90 },
    ]
};
