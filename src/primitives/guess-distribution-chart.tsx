import { useMemo } from "react";

interface GuessDistributionChartProps {
    distribution: number[];
    maxAttempts: number;
    lastGuess?: number;
}

const GuessDistributionChart = ({
    distribution,
    maxAttempts,
    lastGuess,
}: GuessDistributionChartProps) => {
    const maxValue = useMemo(() => Math.max(...distribution, 1), [distribution]);

    return (
        <div className="space-y-2">
            {distribution.map((count, index) => {
                const percentage = (count / maxValue) * 100;
                const isLastGuess = lastGuess === index + 1;

                return (
                    <div key={index} className="flex items-center gap-2">
                        <span className="w-3 text-xs text-muted-foreground text-right">
                            {index + 1}
                        </span>
                        <div className="flex-1 h-5 bg-muted/30 rounded-sm overflow-hidden">
                            <div
                                className={`h-full rounded-sm transition-all duration-500 flex items-center justify-end px-2 ${isLastGuess ? "bg-primary" : "bg-muted-foreground/50"
                                    }`}
                                style={{
                                    width: `${Math.max(percentage, count > 0 ? 8 : 0)}%`,
                                    minWidth: count > 0 ? "24px" : "0",
                                }}
                            >
                                {count > 0 && (
                                    <span className="text-xs font-medium text-background">
                                        {count}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default GuessDistributionChart;
