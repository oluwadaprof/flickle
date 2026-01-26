import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const tomorrow = new Date(now);
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(0, 0, 0, 0);

            const diff = tomorrow.getTime() - now.getTime();

            return {
                hours: Math.floor(diff / (1000 * 60 * 60)),
                minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((diff % (1000 * 60)) / 1000),
            };
        };

        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatNumber = (num: number) => String(num).padStart(2, "0");

    return (
        <div className="flex items-center justify-center gap-3 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Next Flickle in</span>
            <div className="flex items-center gap-1 font-mono text-foreground">
                <span className="bg-secondary px-2 py-1 rounded text-sm">
                    {formatNumber(timeLeft.hours)}
                </span>
                <span>:</span>
                <span className="bg-secondary px-2 py-1 rounded text-sm">
                    {formatNumber(timeLeft.minutes)}
                </span>
                <span>:</span>
                <span className="bg-secondary px-2 py-1 rounded text-sm">
                    {formatNumber(timeLeft.seconds)}
                </span>
            </div>
        </div>
    );
};

export default CountdownTimer;
