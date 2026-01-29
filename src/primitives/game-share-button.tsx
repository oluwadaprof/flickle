import { Share2, Twitter, Facebook, Copy, Check } from "lucide-react";

import { useState } from "react";
import { toast } from "../hooks/use-toast";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem, DropdownMenuTrigger
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";


interface GameShareButtonProps {
    gameMode: string;
    flickleNumber: number;
    won: boolean;
    attempts?: number;
    maxAttempts?: number;
    customText?: string;
    variant?: "default" | "outline" | "ghost";
    size?: "default" | "sm" | "lg" | "icon";
}

const GameShareButton = ({
    gameMode,
    flickleNumber,
    won,
    attempts,
    maxAttempts,
    customText,
    variant = "default",
    size = "default",
}: GameShareButtonProps) => {
    const [copied, setCopied] = useState(false);

    const generateShareText = () => {
        if (customText) return customText;

        const emoji = won ? "✅" : "❌";
        const result = won && attempts && maxAttempts
            ? `${attempts}/${maxAttempts}`
            : won ? "Solved!" : "Failed";

        return `🎬 ${gameMode} #${flickleNumber}
${emoji} ${result}

Play at flickle.app`;
    };

    const shareText = generateShareText();

    const handleCopy = async () => {
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        toast({
            title: "Copied to clipboard!",
            description: "Share your results with friends",
        });
        setTimeout(() => setCopied(false), 2000);
    };

    const handleTwitterShare = () => {
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
        window.open(url, "_blank");
    };

    const handleFacebookShare = () => {
        const url = `https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(shareText)}`;
        window.open(url, "_blank");
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={variant} size={size} className="gap-2">
                    <Share2 className="w-4 h-4" />
                    Share
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-48">
                <DropdownMenuItem onClick={handleCopy} className="gap-2 cursor-pointer">
                    {copied ? (
                        <Check className="w-4 h-4 text-game-correct" />
                    ) : (
                        <Copy className="w-4 h-4" />
                    )}
                    Copy to Clipboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleTwitterShare} className="gap-2 cursor-pointer">
                    <Twitter className="w-4 h-4" />
                    Share on X
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleFacebookShare} className="gap-2 cursor-pointer">
                    <Facebook className="w-4 h-4" />
                    Share on Facebook
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default GameShareButton;
