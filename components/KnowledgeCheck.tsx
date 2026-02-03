
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Question {
    text: string;
    options: string[];
    correctIndex: number;
    explanation: string;
}

export default function KnowledgeCheck() {
    const [status, setStatus] = useState<'idle' | 'active' | 'answered'>('idle');
    const [selectedOption, setSelectedOption] = useState<number | null>(null);

    // Mock question for implementation demo
    // In production, this would be fetched from /api/knowledge-check
    const question: Question = {
        text: "How should you prefix your git branches for new features according to the guidelines?",
        options: [
            "new-feature/",
            "feature/",
            "dev/",
            "feat-"
        ],
        correctIndex: 1,
        explanation: "According to our Git Workflow guidelines, all new features should be on branches prefixed with 'feature/'."
    };

    const handleAnswer = (index: number) => {
        setSelectedOption(index);
        setStatus('answered');
    };

    return (
        <div className="glass-card p-6 gradient-border overflow-hidden relative">
            <AnimatePresence mode="wait">
                {status === 'idle' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center"
                    >
                        <div className="text-3xl mb-4 text-primary">🧠</div>
                        <h3 className="text-xl font-bold mb-2">Knowledge Check</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Ready to test your knowledge of the company docs?
                        </p>
                        <button
                            onClick={() => setStatus('active')}
                            className="btn-primary w-full"
                        >
                            Start Quiz (+10 XP)
                        </button>
                    </motion.div>
                )}

                {status === 'active' && (
                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -50, opacity: 0 }}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-semibold text-primary uppercase">Quick Challenge</span>
                            <span className="text-xs text-muted-foreground">Engineering Docs</span>
                        </div>
                        <h4 className="font-bold mb-4 text-lg leading-snug">
                            {question.text}
                        </h4>
                        <div className="space-y-3">
                            {question.options.map((option, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleAnswer(i)}
                                    className="w-full text-left p-3 rounded-lg bg-muted/50 hover:bg-primary/10 border border-transparent hover:border-primary/30 transition-all text-sm"
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {status === 'answered' && (
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-center"
                    >
                        <div className={`text-4xl mb-4 ${selectedOption === question.correctIndex ? 'text-emerald-500' : 'text-rose-500'}`}>
                            {selectedOption === question.correctIndex ? '🎉' : '❌'}
                        </div>
                        <h3 className="text-xl font-bold mb-2">
                            {selectedOption === question.correctIndex ? 'Correct!' : 'Not quite...'}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 italic">
                            {question.explanation}
                        </p>
                        <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20 mb-4">
                            <span className="text-xs font-bold text-emerald-500 uppercase">
                                {selectedOption === question.correctIndex ? '+10 XP Earned' : 'Nice try! Read the doc to learn more'}
                            </span>
                        </div>
                        <button
                            onClick={() => {
                                setStatus('idle');
                                setSelectedOption(null);
                            }}
                            className="text-sm text-primary hover:underline"
                        >
                            Try another one tomorrow
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
