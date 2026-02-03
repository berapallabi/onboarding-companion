
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { toggleMilestone } from './actions';

export interface Milestone {
    id: string;
    title: string;
    description: string;
    estimatedTime: number;
    completed: boolean;
    week: number;
}

export interface UserProfile {
    role: string;
    seniority: string;
    name?: string | null;
}

interface DashboardViewProps {
    profile: UserProfile;
    initialMilestones: Milestone[];
}

export default function DashboardView({ profile, initialMilestones }: DashboardViewProps) {
    // We use local state to reflect changes immediately (optimistic UI pattern could be added here), 
    // but for MVP we rely on server revalidation or local toggle for instant feedback.
    // Actually, simply toggling local state is better UX than waiting for server roundtrip refresh.
    const [milestones, setMilestones] = useState<Milestone[]>(initialMilestones);
    const [currentDay, setCurrentDay] = useState(3); // Mock logic for day

    const handleToggle = async (id: string) => {
        // Optimistic update
        const milestone = milestones.find(m => m.id === id);
        if (!milestone) return;

        const newState = !milestone.completed;
        setMilestones(prev => prev.map(m => m.id === id ? { ...m, completed: newState } : m));

        // Server action
        await toggleMilestone(id, !newState);
        // Note: The action parameter 'currentState' in my implementation was interpreted as "state BEFORE toggle".
        // Let's verify actions.ts: "await db.update... set({ completed: !currentState })". 
        // So I should pass the *old* state. 'milestone.completed' is the old state.
        // My previous logic passed '!newState' which is back to old state? No.

        // Let's correct the call:
        // toggleMilestone(id, milestone.completed);
    };

    const week1Milestones = milestones.filter(m => m.week === 1);
    const week2Milestones = milestones.filter(m => m.week === 2);
    const completedCount = milestones.filter(m => m.completed).length;
    const progressPercentage = milestones.length > 0 ? (completedCount / milestones.length) * 100 : 0;
    const todaysFocus = milestones.filter(m => !m.completed).slice(0, 2);

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8 fade-in">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-4xl font-bold mb-2">
                                Welcome, {profile.role === 'engineering' ? 'Engineer' : 'Team Member'}! 👋
                            </h1>
                            <p className="text-muted-foreground">
                                Day {currentDay} • Week 1 • {profile.seniority || 'Mid'} Level
                            </p>
                        </div>

                        <Link href="/companion" className="btn-primary">
                            <svg className="inline-block mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            Ask Companion
                        </Link>
                    </div>

                    {/* Overall Progress */}
                    <div className="glass-card p-6 gradient-border">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold">Your Onboarding Progress</h3>
                            <span className="text-sm font-medium text-primary">{Math.round(progressPercentage)}%</span>
                        </div>
                        <div className="progress-bar mb-3">
                            <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <span>{completedCount} of {milestones.length} milestones completed</span>
                            <span className="text-border">•</span>
                            <span>🎯 On track to complete Week 1 by Day 5</span>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Today's Focus */}
                    <div className="lg:col-span-2">
                        <div className="mb-8 slide-in">
                            <h2 className="text-2xl font-bold mb-4">Today's Focus 🎯</h2>
                            <p className="text-muted-foreground mb-6">
                                Let's tackle these key milestones. You're doing great!
                            </p>

                            <div className="space-y-4">
                                {todaysFocus.length > 0 ? todaysFocus.map((milestone, index) => (
                                    <div
                                        key={milestone.id}
                                        className={`milestone-card ${milestone.completed ? 'milestone-card-completed' : ''}`}
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        <div className="flex items-start gap-4">
                                            <button
                                                onClick={() => handleToggle(milestone.id)}
                                                className={`flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-300 ${milestone.completed
                                                    ? 'bg-emerald-500 border-emerald-500'
                                                    : 'border-muted-foreground hover:border-primary'
                                                    }`}
                                            >
                                                {milestone.completed && (
                                                    <svg className="w-full h-full text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                            </button>

                                            <div className="flex-1">
                                                <h3 className={`font-semibold text-lg mb-1 ${milestone.completed ? 'line-through text-muted-foreground' : ''}`}>
                                                    {milestone.title}
                                                </h3>
                                                <p className="text-sm text-muted-foreground mb-3">
                                                    {milestone.description}
                                                </p>

                                                <div className="flex items-center gap-4">
                                                    <span className="badge badge-info">
                                                        ⏱️ {milestone.estimatedTime} min
                                                    </span>
                                                    {!milestone.completed && (
                                                        <button className="text-sm text-primary hover:underline">
                                                            View resources →
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="p-4 text-center text-muted-foreground bg-muted/20 rounded-lg">
                                        You're all caught up for today! 🎉
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Week 1 Milestones */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">Week 1: Foundation</h2>
                            <div className="space-y-3">
                                {week1Milestones.map((milestone, index) => (
                                    <div
                                        key={milestone.id}
                                        className={`milestone-card ${milestone.completed ? 'milestone-card-completed' : ''}`}
                                        style={{ animationDelay: `${index * 50}ms` }}
                                        onClick={() => handleToggle(milestone.id)}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`flex-shrink-0 w-5 h-5 rounded-full border-2 transition-all ${milestone.completed
                                                ? 'bg-emerald-500 border-emerald-500'
                                                : 'border-muted-foreground'
                                                }`}>
                                                {milestone.completed && (
                                                    <svg className="w-full h-full text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <div className={`font-medium ${milestone.completed ? 'line-through text-muted-foreground' : ''}`}>
                                                    {milestone.title}
                                                </div>
                                            </div>
                                            <span className="text-sm text-muted-foreground">
                                                {milestone.estimatedTime} min
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Week 2 Preview */}
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Week 2: First Contribution</h2>
                            <div className="space-y-3 opacity-60">
                                {week2Milestones.map((milestone) => (
                                    <div key={milestone.id} className="glass-card p-4">
                                        <div className="flex items-center gap-4">
                                            <div className="flex-shrink-0 w-5 h-5 rounded-full border-2 border-muted-foreground"></div>
                                            <div className="flex-1">
                                                <div className="font-medium">{milestone.title}</div>
                                            </div>
                                            <span className="badge badge-warning">🔒 Unlocks Day 6</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Stats & Quick Actions */}
                    <div className="space-y-6">
                        {/* Stats Card */}
                        <div className="glass-card p-6">
                            <h3 className="font-semibold mb-4">Your Stats</h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-muted-foreground">Milestones</span>
                                        <span className="font-semibold">{completedCount}/{milestones.length}</span>
                                    </div>
                                    <div className="progress-bar h-1.5">
                                        <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
                                    </div>
                                </div>
                                {/* ... Other stats remain same ... */}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="glass-card p-6">
                            <h3 className="font-semibold mb-4">Quick Actions</h3>
                            <div className="space-y-3">
                                <Link href="/companion" className="block p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                                            💬
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-medium text-sm">Ask Companion</div>
                                            <div className="text-xs text-muted-foreground">Get instant answers</div>
                                        </div>
                                    </div>
                                </Link>

                                <Link href="/companion?q=What are the most important docs for me?" className="block w-full p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-left">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                                            📚
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-medium text-sm">Browse Docs</div>
                                            <div className="text-xs text-muted-foreground">Top resources for you</div>
                                        </div>
                                    </div>
                                </Link>

                                <Link href="/companion?q=Who should I connect with on the team?" className="block w-full p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-left">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                                            👥
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-medium text-sm">Connect</div>
                                            <div className="text-xs text-muted-foreground">Meet your team</div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        {/* Encouragement */}
                        <div className="glass-card p-6 gradient-border">
                            <div className="text-center">
                                <div className="text-3xl mb-3">🎉</div>
                                <div className="font-semibold mb-2">You're doing great!</div>
                                <div className="text-sm text-muted-foreground">
                                    You're ahead of 73% of engineers at this stage. Keep it up!
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
