'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveAssessment } from './actions';

interface AssessmentData {
    role: string;
    seniority: string;
    skills: string[];
}

export default function AssessmentPage() {
    // router is unused here, removing it if not needed or just ignoring lint
    // const router = useRouter(); // if this was here
    const [step, setStep] = useState(1);
    const [data, setData] = useState<AssessmentData>({
        role: '',
        seniority: '',
        skills: []
    });

    const roles = [
        { id: 'engineering', label: 'Engineering', icon: '💻', color: 'from-purple-500 to-blue-500' },
        { id: 'design', label: 'Design', icon: '🎨', color: 'from-pink-500 to-purple-500' },
        { id: 'product', label: 'Product', icon: '📊', color: 'from-blue-500 to-cyan-500' },
        { id: 'marketing', label: 'Marketing', icon: '📢', color: 'from-orange-500 to-pink-500' }
    ];

    const seniorities = [
        { id: 'junior', label: 'Junior', description: 'Just starting out or early career' },
        { id: 'mid', label: 'Mid-Level', description: '2-5 years of experience' },
        { id: 'senior', label: 'Senior', description: '5+ years of experience' }
    ];

    const skillsByRole: Record<string, string[]> = {
        engineering: [
            'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python',
            'PostgreSQL', 'Docker', 'Kubernetes', 'AWS', 'Git', 'Next.js', 'GraphQL'
        ],
        design: [
            'Figma', 'Adobe XD', 'Sketch', 'UI Design', 'UX Research',
            'Prototyping', 'Design Systems', 'Atomic Design', 'Typography', 'Color Theory'
        ],
        product: [
            'Agile/Scrum', 'Product Roadmap', 'User Stories', 'Market Research',
            'A/B Testing', 'Data Analysis', 'Jira/Asana', 'Stakeholder Management', 'PRD Writing'
        ],
        marketing: [
            'SEO', 'Content Strategy', 'Email Marketing', 'Google Analytics',
            'Social Media', 'PPC Advertising', 'Brand Identity', 'Copywriting', 'CRM'
        ]
    };

    const currentRoleSkills = skillsByRole[data.role as keyof typeof skillsByRole] || skillsByRole.engineering;

    const handleRoleSelect = (roleId: string) => {
        setData({ ...data, role: roleId });
    };

    const handleSenioritySelect = (seniorityId: string) => {
        setData({ ...data, seniority: seniorityId });
    };

    const toggleSkill = (skill: string) => {
        setData({
            ...data,
            skills: data.skills.includes(skill)
                ? data.skills.filter(s => s !== skill)
                : [...data.skills, skill]
        });
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('role', data.role);
        formData.append('seniority', data.seniority);
        formData.append('skills', JSON.stringify(data.skills));
        formData.append('goals', ''); // Optional goals

        await saveAssessment(formData);
    };

    const handleNext = () => {
        if (step < 3) {
            setStep(step + 1);
        } else {
            handleSubmit();
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const canProceed = () => {
        if (step === 1) return data.role !== '';
        if (step === 2) return data.seniority !== '';
        if (step === 3) return true; // Skills are optional
        return false;
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-3xl w-full fade-in">
                {/* Progress Indicator */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-muted-foreground">Step {step} of 3</span>
                        <span className="text-sm font-medium text-primary">{Math.round((step / 3) * 100)}% Complete</span>
                    </div>
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${(step / 3) * 100}%` }}></div>
                    </div>
                </div>

                {/* Question 1: Role */}
                {step === 1 && (
                    <div className="slide-in">
                        <h2 className="text-3xl font-bold mb-4 tracking-tight">Let&apos;s map your journey</h2>
                        <p className="text-muted-foreground mb-8">
                            This helps us personalize your onboarding experience
                        </p>

                        <div className="grid md:grid-cols-2 gap-4 mb-8">
                            {roles.map((role) => (
                                <button
                                    key={role.id}
                                    onClick={() => handleRoleSelect(role.id)}
                                    className={`glass-card p-6 text-left transition-all duration-300 hover:scale-105 ${data.role === role.id ? 'border-primary border-2 bg-primary/10' : 'cursor-pointer'
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center text-2xl`}>
                                            {role.icon}
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-semibold text-lg">{role.label}</div>
                                            {data.role === role.id && (
                                                <div className="text-sm text-primary mt-1">Selected ✓</div>
                                            )}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Question 2: Seniority */}
                {step === 2 && (
                    <div className="slide-in">
                        <h2 className="text-3xl font-bold mb-3">What's your experience level?</h2>
                        <p className="text-muted-foreground mb-8">
                            We'll tailor the complexity of your learning path
                        </p>

                        <div className="space-y-4 mb-8">
                            {seniorities.map((seniority) => (
                                <button
                                    key={seniority.id}
                                    onClick={() => handleSenioritySelect(seniority.id)}
                                    className={`glass-card p-6 text-left w-full transition-all duration-300 hover:scale-[1.02] ${data.seniority === seniority.id ? 'border-primary border-2 bg-primary/10' : 'cursor-pointer'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="font-semibold text-lg mb-1">{seniority.label}</div>
                                            <div className="text-sm text-muted-foreground">{seniority.description}</div>
                                        </div>
                                        {data.seniority === seniority.id && (
                                            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Question 3: Skills */}
                {step === 3 && (
                    <div className="slide-in">
                        <h2 className="text-3xl font-bold mb-3">What technologies do you know?</h2>
                        <p className="text-muted-foreground mb-8">
                            Select all that apply. We'll skip the basics for technologies you already know.
                        </p>

                        <div className="glass-card p-6 mb-8">
                            <div className="flex flex-wrap gap-3">
                                {currentRoleSkills.map((skill: string) => (
                                    <button
                                        key={skill}
                                        onClick={() => toggleSkill(skill)}
                                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${data.skills.includes(skill)
                                            ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/30'
                                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                                            }`}
                                    >
                                        {skill}
                                        {data.skills.includes(skill) && (
                                            <span className="ml-2">✓</span>
                                        )}
                                    </button>
                                ))}
                            </div>

                            {data.skills.length > 0 && (
                                <div className="mt-4 pt-4 border-t border-border">
                                    <p className="text-sm text-muted-foreground">
                                        {data.skills.length} {data.skills.length === 1 ? 'skill' : 'skills'} selected
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between">
                    <button
                        onClick={handleBack}
                        disabled={step === 1}
                        className={`btn-secondary ${step === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <svg className="inline-block mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back
                    </button>

                    <button
                        onClick={handleNext}
                        disabled={!canProceed()}
                        className={`btn-primary ${!canProceed() ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {step === 3 ? 'Complete' : 'Continue'}
                        <svg className="inline-block ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </button>
                </div>

                {/* Skip Link */}
                {step === 3 && (
                    <div className="text-center mt-6">
                        <button
                            onClick={handleNext}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Skip for now →
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
