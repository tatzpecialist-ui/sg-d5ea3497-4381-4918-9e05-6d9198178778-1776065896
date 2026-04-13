import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { AdminLayout } from "@/components/AdminLayout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { authService } from "@/services/authService";
import type { AuthUser } from "@/services/authService";
import { User, Lock, LogOut, Mail } from "lucide-react";

export default function AdminProfile() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error("Error loading user:", error);
      toast({
        title: "Error",
        description: "Failed to load user information",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Passwords Don't Match",
        description: "Please make sure both passwords are identical",
        variant: "destructive",
      });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return;
    }

    setIsUpdating(true);

    try {
      const { error } = await authService.resetPassword(user?.email || "");
      
      if (error) {
        throw new Error(error.message);
      }

      toast({
        title: "Password Reset Email Sent",
        description: "Check your email for a password reset link",
      });

      setPasswordData({ newPassword: "", confirmPassword: "" });
    } catch (error) {
      console.error("Password update error:", error);
      toast({
        title: "Update Failed",
        description: "Failed to send password reset email",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await authService.signOut();
      toast({
        title: "Signed Out",
        description: "You have been signed out successfully",
      });
      router.push("/admin/login");
    } catch (error) {
      console.error("Sign out error:", error);
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <SEO
        title="Profile Settings - 13 Media Works"
        description="Manage your admin account settings"
      />
      
      <main className="min-h-screen bg-background pt-8 pb-16">
        <div className="container max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-serif font-bold text-foreground mb-2">
              Profile Settings
            </h1>
            <p className="text-muted-foreground">
              Manage your account settings and preferences
            </p>
          </div>

          <div className="space-y-6">
            {/* Account Information */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <User className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>Your admin account details</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg border border-border">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{user?.email || "Not available"}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    This is your admin login email address
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Account Created</Label>
                  <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg border border-border">
                    <span className="text-sm">
                      {user?.created_at 
                        ? new Date(user.created_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "Not available"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Password Update */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Lock className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <CardTitle>Password Reset</CardTitle>
                    <CardDescription>
                      Request a password reset link via email
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordUpdate} className="space-y-4">
                  <div className="bg-muted/30 p-4 rounded-lg border border-border">
                    <p className="text-sm text-muted-foreground mb-2">
                      For security, we'll send a password reset link to your email:
                    </p>
                    <p className="text-sm font-medium">{user?.email}</p>
                  </div>

                  <Button
                    type="submit"
                    disabled={isUpdating}
                    className="w-full sm:w-auto bg-accent hover:bg-accent/90"
                  >
                    {isUpdating ? "Sending..." : "Send Reset Link"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Sign Out */}
            <Card className="border-destructive/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-destructive/10 rounded-lg">
                    <LogOut className="h-5 w-5 text-destructive" />
                  </div>
                  <div>
                    <CardTitle>Sign Out</CardTitle>
                    <CardDescription>
                      Sign out from your admin account
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={handleSignOut}
                  variant="destructive"
                  className="w-full sm:w-auto"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </AdminLayout>
  );
}