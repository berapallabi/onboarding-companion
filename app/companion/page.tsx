'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    confidence?: 'high' | 'medium' | 'low';
    sources?: { title: string; url: string }[];
    timestamp: Date;
}

export default function CompanionPage() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: "Hi! I'm your onboarding companion. 👋 I'm here to help you navigate your first few weeks. You can ask me anything - where to find documents, how things work, or even just to explain unfamiliar terms. No question is too basic!",
            confidence: 'high',
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const mockResponses: Record<string, { content: string; confidence: 'high' | 'medium' | 'low'; sources?: { title: string; url: string }[] }> = {
        vpn: {
            content: "Great question! The VPN configuration guide is in our IT Setup documentation. You'll need your employee ID (sent in your welcome email) to authenticate. Here's what to do:\n\n1. Download the VPN client from our internal tools page\n2. Use your employee email and the password you set during onboarding\n3. Connect to the 'Engineering-US' server\n\nNeed help finding your employee ID?",
            confidence: 'high',
            sources: [
                { title: 'VPN Setup Guide', url: 'https://notion.so/vpn-setup' },
                { title: 'IT Onboarding Checklist', url: 'https://notion.so/it-checklist' }
            ]
        },
        auth: {
            content: "Our authentication service (Auth_Service) is the central microservice that handles user login, OAuth, and session management. Since you're an engineer, here's the technical overview:\n\n**Architecture:**\n- Built with Node.js and Express\n- Uses JWT tokens for session management\n- Supports OAuth 2.0 for third-party login\n- Redis for session storage\n\n**Key Endpoints:**\n- `POST /api/auth/login` - User login\n- `POST /api/auth/refresh` - Token refresh\n- `GET /api/auth/validate` - Validate session\n\nThe full architecture docs and API specs are linked below. This is definitely one of the \"holy grail\" docs you'll want to bookmark!",
            confidence: 'high',
            sources: [
                { title: 'Auth_Service Architecture', url: 'https://notion.so/auth-service' },
                { title: 'API Documentation', url: 'https://notion.so/api-docs' }
            ]
        },
        first: {
            content: "Excellent question! For your first contribution, I recommend starting with our \"good first issues\" in Jira. Here's the process:\n\n**Step 1:** Browse issues tagged with `good-first-issue`\n**Step 2:** Pick something that interests you (UI bugs are great starters!)\n**Step 3:** Comment on the issue to claim it\n**Step 4:** Create a branch following our naming convention: `feature/[ticket-id]-brief-description`\n**Step 5:** Make your changes, write tests, and submit a PR\n\nMost engineers ship their first PR by Day 10-12. You're on Day 3, so you're ahead of schedule if you're already thinking about this!",
            confidence: 'high',
            sources: [
                { title: 'Contribution Guide', url: 'https://notion.so/contribution-guide' },
                { title: 'Git Workflow', url: 'https://notion.so/git-workflow' }
            ]
        },
        overwhelmed: {
            content: "I totally understand - it's completely normal to feel overwhelmed in your first week! Here's what I'd recommend:\n\n**Focus on these 3 things today:**\n1. Get your local environment running (if you haven't already)\n2. Read the Architecture Overview doc (30 min read)\n3. Attend today's team standup just to listen and observe\n\n**Don't worry about:**\n- Understanding the entire codebase (nobody does!)\n- Reading every doc in the wiki\n- Knowing all the internal tools yet\n\nYou have **5 full weeks** of structured onboarding. By Week 2, you'll feel much more comfortable. And remember - everyone on the team has been exactly where you are right now. 💙",
            confidence: 'high'
        },
        default: {
            content: "I want to make sure I give you the most accurate answer. Let me search our documentation for that... In the meantime, this might be a great question for your onboarding buddy or the team channel. Would you like me to help you figure out who to ask?",
            confidence: 'medium'
        }
    };

    const getResponse = (userMessage: string): typeof mockResponses.default => {
        const lower = userMessage.toLowerCase();
        if (lower.includes('vpn') || lower.includes('config')) return mockResponses.vpn;
        if (lower.includes('auth') || lower.includes('authentication') || lower.includes('login')) return mockResponses.auth;
        if (lower.includes('first') && (lower.includes('pr') || lower.includes('contribution') || lower.includes('issue'))) return mockResponses.first;
        if (lower.includes('overwhelm') || lower.includes('lost') || lower.includes('confused')) return mockResponses.overwhelmed;
        return mockResponses.default;
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        // Simulate typing delay
        setTimeout(() => {
            const response = getResponse(input);
            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: response.content,
                confidence: response.confidence,
                sources: response.sources,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, assistantMessage]);
            setIsTyping(false);
        }, 1500);
    };

    const quickQuestions = [
        "Where is the VPN config?",
        "How does Auth_Service work?",
        "What should I work on first?",
        "I'm feeling overwhelmed"
    ];

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <div className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                            </Link>
                            <div>
                                <h1 className="text-xl font-bold">AI Companion</h1>
                                <p className="text-xs text-muted-foreground">Ask me anything, anytime</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="text-sm text-muted-foreground">Online</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto">
                <div className="max-w-4xl mx-auto px-4 py-8">
                    <div className="space-y-6">
                        {messages.map((message, index) => (
                            <div
                                key={message.id}
                                className={`fade-in ${message.role === 'user' ? 'flex justify-end' : ''}`}
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                {message.role === 'assistant' ? (
                                    <div className="max-w-[85%]">
                                        <div className="flex items-start gap-3 mb-2">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center flex-shrink-0">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                </svg>
                                            </div>
                                            <div className="flex-1">
                                                <div className="chat-bubble-assistant">
                                                    <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                                                </div>

                                                <div className="flex items-center gap-3 mt-2 ml-1">
                                                    {message.confidence && (
                                                        <span className={`badge ${message.confidence === 'high' ? 'badge-success' :
                                                                message.confidence === 'medium' ? 'badge-warning' :
                                                                    'badge-info'
                                                            }`}>
                                                            {message.confidence === 'high' ? '✓ High confidence' :
                                                                message.confidence === 'medium' ? '⚡ Medium confidence' :
                                                                    '? Low confidence'}
                                                        </span>
                                                    )}
                                                    <span className="text-xs text-muted-foreground">
                                                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                </div>

                                                {message.sources && message.sources.length > 0 && (
                                                    <div className="mt-3 ml-1 space-y-2">
                                                        <div className="text-xs font-semibold text-muted-foreground">Sources:</div>
                                                        {message.sources.map((source, idx) => (
                                                            <a
                                                                key={idx}
                                                                href={source.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="block glass-card p-3 hover:border-primary/50 transition-colors"
                                                            >
                                                                <div className="flex items-center gap-2">
                                                                    <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                                    </svg>
                                                                    <span className="text-sm font-medium">{source.title}</span>
                                                                    <svg className="w-3 h-3 text-muted-foreground ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                                    </svg>
                                                                </div>
                                                            </a>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="chat-bubble-user">
                                        <p className="leading-relaxed">{message.content}</p>
                                    </div>
                                )}
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex items-start gap-3 fade-in">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <div className="chat-bubble-assistant">
                                    <div className="flex items-center gap-1">
                                        <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                        <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                        <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>
                </div>
            </div>

            {/* Input Area */}
            <div className="border-t border-border bg-card/50 backdrop-blur-xl">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    {/* Quick Questions */}
                    {messages.length === 1 && (
                        <div className="mb-4">
                            <p className="text-sm text-muted-foreground mb-3">Quick questions to get started:</p>
                            <div className="flex flex-wrap gap-2">
                                {quickQuestions.map((q) => (
                                    <button
                                        key={q}
                                        onClick={() => setInput(q)}
                                        className="px-3 py-2 rounded-lg bg-muted hover:bg-muted/80 text-sm transition-colors"
                                    >
                                        {q}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Input */}
                    <div className="flex items-end gap-3">
                        <div className="flex-1 glass-card p-0 overflow-hidden">
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSend();
                                    }
                                }}
                                placeholder="Ask me anything... (e.g., 'Where is the VPN config?')"
                                className="w-full px-4 py-3 bg-transparent border-none outline-none resize-none max-h-32"
                                rows={1}
                            />
                        </div>
                        <button
                            onClick={handleSend}
                            disabled={!input.trim() || isTyping}
                            className={`btn-primary px-4 py-3 ${(!input.trim() || isTyping) ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </button>
                    </div>

                    <p className="text-xs text-muted-foreground mt-2 text-center">
                        Press Enter to send • Shift + Enter for new line • All conversations are private
                    </p>
                </div>
            </div>
        </div>
    );
}
