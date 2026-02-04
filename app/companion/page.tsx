'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

// Match AI SDK 6.0 UIMessage structure if possible or use any for flexibility during migration
interface UIMessage {
    id: string;
    role: 'user' | 'assistant' | 'system';
    parts: Array<{ type: 'text'; text: string;[key: string]: any }>;
    [key: string]: any;
}

import { useChat } from '@ai-sdk/react';

// ... (keep interface Message if needed or use SDK type)

function CompanionContent() {
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get('q');
    const hasRun = useRef(false);
    const [localInput, setLocalInput] = useState('');
    const lastProcessedQuery = useRef<string | null>(null);

    // AI SDK 6.0 usage
    const { messages, sendMessage, status, setMessages } = useChat();
    const isLoading = status === 'streaming' || status === 'submitted';

    // Helper to extract text from new UIMessage parts structure
    const getMessageText = (message: any) => {
        if (message.text) return message.text;
        if (message.content) return message.content;
        if (message.parts) {
            return message.parts
                .filter((p: any) => p.type === 'text')
                .map((p: any) => p.text)
                .join('');
        }
        return '';
    };

    const displayMessages = messages.length > 0 ? messages : [
        {
            id: '1',
            role: 'assistant',
            parts: [{ type: 'text', text: "Hi! I'm your onboarding companion. 👋 I'm here to help you navigate your first few weeks. You can ask me anything - where to find documents, how things work, or even just to explain unfamiliar terms. No question is too basic!" }],
            createdAt: new Date()
        }
    ];

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleQuickSend = async (text: string) => {
        if (!text.trim()) return;
        await sendMessage({
            text: text
        });
    };

    const handleFormSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!localInput.trim()) return;

        const content = localInput;
        setLocalInput(''); // Clear immediately

        await sendMessage({
            text: content
        });
    };

    // Auto-send initial query
    useEffect(() => {
        if (initialQuery && initialQuery !== lastProcessedQuery.current) {
            lastProcessedQuery.current = initialQuery;
            // Clear messages and send new query to simulate a fresh search from dashboard
            setMessages([]);
            sendMessage({ text: initialQuery });
        }
    }, [initialQuery, sendMessage, setMessages]);

    // Delete getResponse and mockResponses.


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
                        {displayMessages.map((message: any, index: number) => (
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
                                                    <p className="whitespace-pre-wrap leading-relaxed">
                                                        {getMessageText(message)}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-3 mt-2 ml-1">
                                                    <span className="text-xs text-muted-foreground">
                                                        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="chat-bubble-user">
                                        <p className="leading-relaxed">{getMessageText(message)}</p>
                                    </div>
                                )}
                            </div>
                        ))}

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
                                {quickQuestions.map((question, index) => (
                                    <div key={index} className="flex-shrink-0">
                                        <button
                                            onClick={() => handleQuickSend(question)}
                                            className="px-4 py-2 rounded-full glass-card hover:border-primary/50 hover:bg-primary/5 transition-all text-sm whitespace-nowrap"
                                        >
                                            {question}
                                        </button>
                                    </div>))}
                            </div>
                        </div>
                    )}

                    {/* Input */}
                    <form onSubmit={handleFormSubmit} className="flex items-end gap-3">
                        <div className="flex-1 glass-card p-0 overflow-hidden">
                            <textarea
                                value={localInput}
                                onChange={(e) => setLocalInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleFormSubmit();
                                    }
                                }}
                                placeholder="Ask me anything... (e.g., 'Where is the VPN config?')"
                                className="w-full px-4 py-3 bg-transparent border-none outline-none resize-none max-h-32"
                                rows={1}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={!localInput.trim()}
                            className={`btn-primary px-4 py-3 ${(!localInput.trim()) ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </button>
                    </form>

                    <p className="text-xs text-muted-foreground mt-2 text-center">
                        Press Enter to send • Shift + Enter for new line • All conversations are private
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function CompanionPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <CompanionContent />
        </Suspense>
    );
}
