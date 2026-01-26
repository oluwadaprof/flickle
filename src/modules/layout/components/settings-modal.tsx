import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/src/primitives/ui/dialog";

import { toast } from "sonner";
import { LogOut, User, Save } from "lucide-react";
import { Label } from "@/src/primitives/ui/label";
import { Input } from "@/src/primitives/ui/input";
import { Button } from "@/src/primitives/ui/button";
import { Switch } from "@/src/primitives/ui/switch";
import { useAuthStore } from "@/src/store/use-auth-store";
import { supabase } from "@/src/integrations/supabase/client";

interface SettingsModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const SettingsModal = ({ open, onOpenChange }: SettingsModalProps) => {
    const { user, isGuest, signOut } = useAuthStore();
    const [displayName, setDisplayName] = useState("");
    const [hardMode, setHardMode] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (user) {
            fetchProfile();
        }

        const savedHardMode = localStorage.getItem("flickle_hard_mode");
        if (savedHardMode) {
            setHardMode(savedHardMode === "true");
        }
    }, [user]);

    const fetchProfile = async () => {
        if (!user) return;

        const { data } = await supabase
            .from("profiles")
            .select("display_name")
            .eq("user_id", user.id)
            .maybeSingle();

        if (data) {
            setDisplayName(data.display_name);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);

        try {
            if (user && displayName.trim()) {
                const { error } = await supabase
                    .from("profiles")
                    .update({ display_name: displayName.trim() })
                    .eq("user_id", user.id);

                if (error) throw error;
            }

            localStorage.setItem("flickle_hard_mode", String(hardMode));
            toast.success("Settings saved!");
        } catch (error) {
            toast.error("Failed to save settings");
        } finally {
            setIsSaving(false);
        }
    };

    const handleSignOut = async () => {
        await signOut();
        onOpenChange(false);
        toast.success("Signed out successfully");
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md bg-card border-border">
                <DialogHeader>
                    <DialogTitle className="font-display text-2xl text-center">
                        Settings
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 mt-4">
                    {/* Account Section */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                            Account
                        </h3>

                        {isGuest ? (
                            <div className="p-4 bg-background rounded-lg border border-border">
                                <p className="text-sm text-muted-foreground">
                                    Playing as guest. Create an account to save your progress and appear on the leaderboard.
                                </p>
                            </div>
                        ) : user ? (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="displayName" className="text-sm text-muted-foreground">
                                        Display Name
                                    </Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <Input
                                            id="displayName"
                                            type="text"
                                            value={displayName}
                                            onChange={(e) => setDisplayName(e.target.value)}
                                            className="pl-10 bg-background border-border"
                                        />
                                    </div>
                                </div>

                                <div className="p-3 bg-background rounded-lg border border-border">
                                    <p className="text-xs text-muted-foreground">
                                        Signed in as <span className="text-foreground">{user.email}</span>
                                    </p>
                                </div>
                            </div>
                        ) : null}
                    </div>

                    {/* Game Settings */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                            Game
                        </h3>

                        <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
                            <div>
                                <p className="text-sm font-medium text-foreground">Hard Mode</p>
                                <p className="text-xs text-muted-foreground">
                                    Revealed hints must be used in subsequent guesses
                                </p>
                            </div>
                            <Switch
                                checked={hardMode}
                                onCheckedChange={setHardMode}
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-2">
                        <Button
                            onClick={handleSave}
                            className="w-full gap-2"
                            disabled={isSaving}
                        >
                            <Save className="w-4 h-4" />
                            {isSaving ? "Saving..." : "Save Settings"}
                        </Button>

                        {user && (
                            <Button
                                variant="outline"
                                onClick={handleSignOut}
                                className="w-full gap-2 text-destructive hover:text-destructive"
                            >
                                <LogOut className="w-4 h-4" />
                                Sign Out
                            </Button>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SettingsModal;
