"use client";

import React from 'react';
import { cn } from '@/app/lib/utils';

interface Step {
    id: number;
    title: string;
    description: string;
    content: string;
    icon?: React.ReactNode;
}

interface ZigzagStepsProps {
    steps: Step[];
    className?: string;
}

const ZigZagSteps: React.FC<ZigzagStepsProps> = ({ steps, className }) => {
    return (
        <div className={cn("relative max-w-6xl mx-auto py-12 px-4", className)}>
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-purple-400 md:hidden" />

            {steps.map((step, index) => {
                const isEven = index % 2 === 0;
                const isLast = index === steps.length - 1;

                return (
                    <div
                        key={step.id}
                        className={cn(
                            "relative mb-16 last:mb-0",
                            "md:flex md:items-center md:justify-between",
                            !isEven && "md:flex-row-reverse"
                        )}
                    >
                        {!isLast && (
                            <div className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-0.5 bg-gradient-to-r from-blue-200 to-purple-200 z-0" />
                        )}

                        <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 z-10">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 hover:scale-110">
                                {step.icon || (
                                    <span className="text-2xl font-bold text-white">
                    {step.id}
                  </span>
                                )}
                            </div>
                        </div>

                        <div className={cn(
                            "flex flex-col md:flex-row md:items-center md:justify-between w-full",
                            !isEven && "md:flex-row-reverse"
                        )}>
                            <div className={cn(
                                "ml-24 md:ml-0 md:w-5/12 mb-6 md:mb-0",
                                !isEven && "md:text-right"
                            )}>
                                <div className="group cursor-pointer">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-2 transition-colors duration-300 group-hover:text-blue-600">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-600 text-lg leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>

                            <div className={cn(
                                "ml-24 md:ml-0 md:w-5/12",
                                !isEven && "md:text-left"
                            )}>
                                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                                    <div className="p-6">
                                        <div className="prose prose-gray max-w-none">
                                            {step.content}
                                        </div>
                                    </div>

                                    <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-b-xl" />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ZigZagSteps;