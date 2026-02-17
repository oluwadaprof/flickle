import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/src/primitives/ui/dialog";
import { gameModes } from "../types/game-modes";

interface HelpModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const HelpModal = ({ open, onOpenChange }: HelpModalProps) => {

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg bg-background border-border max-h-[80vh] overflow-hidden p-0 [&>button]:z-20 [&>button]:top-6 [&>button]:right-6 " >
                <DialogHeader className={`absolute top-0 left-0 right-0 z-10  py-6 transition-all duration-200 bg-background/95 backdrop-blur-sm `}>
                    <DialogTitle className="font-display text-xl text-center">
                        How to Play
                    </DialogTitle>
                </DialogHeader>

                <div

                    className="h-[80vh] overflow-y-auto scrollbar-hide pt-20 px-6 pb-6"
                >
                    <div className="space-y-6">
                        <div className="text-center text-muted-foreground font-mono text-sm">
                            <p>A new puzzle is available every day at midnight.</p>
                            <p>Complete all modes to maximize your streak!</p>
                        </div>

                        <div className="space-y-4">
                            {gameModes.map((mode) => (
                                <div
                                    key={mode.title}
                                    className="flex gap-4 p-4 bg-background rounded-lg border border-border"
                                >
                                    <div className="text-2xl">{mode.emoji}</div>
                                    <div className="flex-1 font-mono">
                                        <h3 className="font-mono text-lg  text-foreground">
                                            {mode.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            {mode.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                            <h4 className="font-mono text-base  text-primary mb-2">
                                Color Guide
                            </h4>
                            <div className="space-y-2 text-sm font-mono">
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 bg-correct rounded flex items-center justify-center text-xs font-bold">A</div>
                                    <span className="text-muted-foreground">Correct letter, correct position</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 bg-present rounded flex items-center justify-center text-xs font-bold">B</div>
                                    <span className="text-muted-foreground">Correct letter, wrong position</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 bg-absent rounded flex items-center justify-center text-xs font-bold">C</div>
                                    <span className="text-muted-foreground">Letter not in word</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default HelpModal;