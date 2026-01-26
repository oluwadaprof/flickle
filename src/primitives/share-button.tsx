import { Share2, Twitter, Facebook, Copy, Check } from "lucide-react";

import { useState } from "react";
import { toast } from "../hooks/use-toast";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "./ui/dropdown-menu";
import { Button } from "./ui/button";


interface ShareButtonProps {
    shareText: string;
    flickleNumber: number;
}

const ShareButton = ({ shareText, flickleNumber }: ShareButtonProps) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        toast({
            title: "Copied to clipboard!",
            description: "Share your Flickle results with friends",
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
                <Button size="lg" className="gap-2">
                    <Share2 className="w-5 h-5" />
                    Share Results
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

export default ShareButton;
