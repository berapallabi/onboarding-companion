# Smart Onboarding Companion - Prototype

## Overview

This is a functional prototype of the **Smart Onboarding Companion**, an AI-powered onboarding system designed to solve the "5 weeks to productivity" problem identified in the transcript analysis.

## What's Built

### ✅ Core User Flows

1. **Landing Page** (`/`)
   - Hero section with value proposition
   - Feature highlights (Adaptive Learning, AI Companion, Progress Tracking)
   - Clear CTA to start onboarding
   - Stats showcase (5→2 weeks, 90% confident, 80% self-serve)

2. **Assessment Flow** (`/assessment`)
   - 3-step adaptive assessment
   - Step 1: Role selection (Engineering, Design, Product, Marketing)
   - Step 2: Seniority level (Junior, Mid, Senior)
   - Step 3: Skills selection (JavaScript, React, Node.js, etc.)
   - Progress indicator and navigation
   - Data stored in localStorage for prototype

3. **Journey Dashboard** (`/dashboard`)
   - Personalized welcome message
   - Overall progress tracking with visual progress bar
   - "Today's Focus" section with priority milestones
   - Week 1 & Week 2 milestone lists
   - Interactive milestone completion (click to toggle)
   - Stats sidebar (completion rate, streak, performance)
   - Quick actions (Ask Companion, Browse Docs, Connect)

4. **AI Companion Chat** (`/companion`)
   - Full conversational interface
   - Mock AI responses with realistic content
   - Confidence scoring (High/Medium/Low)
   - Source citations with document links
   - Quick question suggestions
   - Typing indicators
   - Smart responses for common questions:
     - VPN configuration → provides setup guide
     - Auth_Service → technical architecture explanation
     - First contribution → PR workflow guidance
     - Feeling overwhelmed → empathetic support

### 🎨 Design Highlights

- **Neo-Arcade Dark Theme**: Purple & blue gradient aesthetic
- **Glassmorphism**: Frosted glass cards with backdrop blur
- **Smooth Animations**: Fade-in, slide-in, and hover effects
- **Gradient Accents**: Dynamic gradients for CTAs and interactive elements
- **Progress Visualization**: Animated progress bars
- **Responsive Layout**: Works on desktop and mobile

## How to Run

The prototype is currently running at **http://localhost:3000**

If you need to restart it:

```bash
cd "/Users/pallabi/Transcript prototype/onboarding-companion"
npm run dev
```

Then open http://localhost:3000 in your browser.

## User Journey Flow

1. **Start**: Open http://localhost:3000
2. **Click**: "Start Your Journey" button
3. **Assessment**: Complete 3-step assessment (select Engineering → Junior → Skills)
4. **Dashboard**: View personalized journey with milestones
5. **Interact**: Click milestones to mark complete, see progress update
6. **Chat**: Click "Ask Companion" to open AI chat
7. **Ask**: Try questions like "Where is the VPN config?" or "How does Auth Service work?"

## Mock Features

Since this is a prototype, the following are simulated:

- **AI Responses**: Pre-programmed responses for demo questions
- **User Profile**: Stored in localStorage (not a real database)
- **Milestone Data**: Hardcoded sample engineering journey
- **Document Links**: Placeholder Notion URLs

## Documentation 📚

To learn more about the project, architecture, and how to contribute, check out our internal documentation:

- [**Product Overview**](./docs/PRODUCT.md) - Vision, core features, and user flows.
- [**System Architecture**](./docs/ARCHITECTURE.md) - Technical design, data flow, and module breakdown.
- [**Technology Stack**](./docs/TECH_STACK.md) - Details on our modern web and AI stack.
- [**Contributing Guide**](./docs/CONTRIBUTING.md) - How to set up locally, seed the DB, and coding standards.

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State**: React Hooks + localStorage

## File Structure

```
onboarding-companion/
├── app/
│   ├── page.tsx                 # Landing page
│   ├── assessment/page.tsx      # 3-step assessment flow
│   ├── dashboard/page.tsx       # Journey tracker & milestones
│   ├── companion/page.tsx       # AI chat interface
│   ├── globals.css              # Custom styles & animations
│   └── layout.tsx               # Root layout with fonts
├── public/                      # Static assets
└── package.json                 # Dependencies

```

## Key Features Demonstrated

### From the PRD:

✅ **F1: Intelligent Onboarding Assessment**
- 3-question adaptive flow
- Role-based personalization
- Skill capture

✅ **F2: Role-Based Adaptive Journey**
- Personalized milestones
- Week-by-week structure
- Progressive disclosure (Week 2 locked until Week 1 complete)

✅ **F5: Private Q&A Interface**
- Conversational AI
- Confidence scoring
- Source citations
- No social anxiety

✅ **F6: Progress Tracking & Milestones**
- Visual progress bars
- Completion tracking
- Streak counting
- Motivational messages

## Next Steps (Not Built Yet)

- Real AI integration (OpenAI GPT-4)
- Vector database for document search
- Notion API integration
- User authentication
- Database persistence
- Manager analytics dashboard
- Slack/Teams integration

## Design Philosophy

This prototype follows the **"context over content"** philosophy from the PRD:
- Shows only what's relevant for the user's current stage
- Filters information based on role and skills
- Provides encouragement and celebrates progress
- Removes fear of asking basic questions

## Try These Interactions

1. **Complete Assessment** → See how journey adapts
2. **Toggle Milestones** → Watch progress bar update
3. **Ask "Where is the VPN config?"** → See high-confidence response with sources
4. **Ask "How does Auth_Service work?"** → See technical explanation tailored to engineers
5. **Ask "I'm feeling overwhelmed"** → See empathetic, supportive response

---

**Built based on**: PRD (prd-smart-onboarding-companion.md) and Implementation Plan (implementation_plan.md)
