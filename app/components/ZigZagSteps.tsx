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
        <div className={cn("relative max-w-6xl mx-auto py-8 sm:py-12 px-4 sm:px-6", className)}>
            {steps.map((step, index) => {
                const isEven = index % 2 === 0;

                return (
                    <div
                        key={step.id}
                        className={cn(
                            "relative mb-12 sm:mb-16 last:mb-0",
                            "lg:flex lg:items-center lg:justify-between",
                            !isEven && "lg:flex-row-reverse"
                        )}
                    >
                        <div className="absolute left-0 sm:left-4 lg:left-1/2 lg:transform lg:-translate-x-1/2 z-10 top-0 lg:top-0">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-[#7B3F00] to-[#FFF7ED] rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 hover:scale-110">
                                {step.icon || (
                                    <span className="text-lg sm:text-xl lg:text-2xl font-bold text-black">
                                        {step.id}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div
                            className={cn(
                                "flex flex-col lg:flex-row lg:items-center lg:justify-between w-full",
                                !isEven && "lg:flex-row-reverse"
                            )}
                        >
                            <div
                                className={cn(
                                    "ml-16 sm:ml-20 lg:ml-0 lg:w-5/12 mb-6 sm:mb-8 lg:mb-0 pr-4 sm:pr-0 pt-2 lg:pt-0",
                                    !isEven && "lg:text-right lg:pl-4 lg:pr-0"
                                )}
                            >
                                <div className="group cursor-pointer">
                                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#7B3F00] mb-3 sm:mb-4 transition-colors duration-300 group-hover:text-black leading-tight">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-600 text-base sm:text-lg font-semibold leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>

                            <div
                                className={cn(
                                    "ml-16 sm:ml-20 lg:ml-0 lg:w-5/12 pr-4 sm:pr-0",
                                    !isEven && "lg:text-left lg:pr-4 lg:pl-0"
                                )}
                            >
                                <div className="bg-white rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                                    <div className="p-4 sm:p-6">
                                        <div className="prose prose-gray font-bold max-w-none text-sm sm:text-base leading-relaxed">
                                            {step.content}
                                        </div>
                                    </div>
                                    <div className="h-1 bg-gradient-to-r from-[#7B3F00] to-[#FFF7ED] rounded-b-lg sm:rounded-b-xl" />
                                </div>
                            </div>
                        </div>

                        {index < steps.length - 1 && (
                            <div className="lg:hidden absolute left-6 sm:left-10 top-12 sm:top-14 w-0.5 h-12 sm:h-16 bg-gradient-to-b from-[#7B3F00] to-[#FFF7ED] opacity-30" />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default ZigZagSteps;
