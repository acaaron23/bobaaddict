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

            {steps.map((step, index) => {
                const isEven = index % 2 === 0;

                return (
                    <div
                        key={step.id}
                        className={cn(
                            "relative mb-16 last:mb-0",
                            "md:flex md:items-center md:justify-between",
                            !isEven && "md:flex-row-reverse"
                        )}
                    >

                        <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 z-10">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#7B3F00] to-[#FFF7ED] rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 hover:scale-110">
                                {step.icon || (
                                    <span className="text-2xl font-bold text-black">
                    {step.id}
                  </span>
                                )}
                            </div>
                        </div>

                        <div
                            className={cn(
                                "flex flex-col md:flex-row md:items-center md:justify-between w-full",
                                !isEven && "md:flex-row-reverse"
                            )}
                        >
                            <div
                                className={cn(
                                    "ml-24 md:ml-0 md:w-5/12 mb-6 md:mb-0",
                                    !isEven && "md:text-right"
                                )}
                            >
                                <div className="group cursor-pointer">
                                    <h3 className="text-2xl font-extrabold text-[#7B3F00] mb-2 transition-colors duration-300 group-hover:text-black">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-600 text-lg font-semibold leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>

                            <div
                                className={cn(
                                    "ml-24 md:ml-0 md:w-5/12",
                                    !isEven && "md:text-left"
                                )}
                            >
                                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                                    <div className="p-6">
                                        <div className="prose prose-gray font-bold max-w-none">
                                            {step.content}
                                        </div>
                                    </div>
                                    <div className="h-1 bg-gradient-to-r from-[#7B3F00] to-[#FFF7ED] rounded-b-xl" />
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
