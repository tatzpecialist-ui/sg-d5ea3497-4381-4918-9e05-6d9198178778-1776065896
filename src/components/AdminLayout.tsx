import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { authService } from "@/services/authService";
import { Button } from "@/components/ui/button";
import { LogOut, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const session = await authService.getCurrentSession();
      
      if (!session) {
        router.push("/admin/login");
        return;
      }

      setIsAuthenticated(true);
      setIsLoading(false);
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = authService.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        router.push("/admin/login");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  const handleSignOut = async () => {
    const { error } = await authService.signOut();
    
    if (error) {
      toast({
        title: "Sign Out Failed",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Signed Out",
      description: "You have been signed out successfully",
    });

    router.push("/admin/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
          <p className="text-muted-foreground">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="container flex items-center justify-between py-4">
          <h1 className="text-xl font-serif text-foreground">13 Media Works Admin</h1>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSignOut}
            className="gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
      {children}
    </div>
  );
}